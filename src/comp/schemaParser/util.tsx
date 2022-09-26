import { Field, ParsedSchema, Schema } from './model';

export const buildTree = (schemas: Schema[], fields: Field[]) => {
  // fId to field, sId to Schema
  const flatFields = fields.reduce(
    (acc, value) => ((acc[value.id] = value), acc),
    {} as Record<string, Field>,
  );
  const flatSchemas = schemas.reduce(
    (acc, value) => ((acc[value.id] = value), acc),
    {} as Record<string, Schema>,
  );

  // parent -> children (1 to 0-n)
  const parentToChildren = schemas.reduce((acc, value) => {
    if (!value.parent_id) return acc;
    acc[value.parent_id] = acc[value.parent_id] || ([] as string[]);
    acc[value.parent_id].push(value.id);
    return acc;
  }, {} as Record<string, string[]>);

  // validity check & infinite loop prevention
  const touchedSchema = new Set<string>();

  // traverse tree
  const traverse = (schema: Schema, breadcrumbs: number[]): ParsedSchema => {
    const { id, field_type_id: field_id } = schema;
    if (touchedSchema.has(id)) throw new Error('buildtree failed: possible double reference ' + id);
    touchedSchema.add(id);
    const rawChildren = parentToChildren[id]?.map(id => flatSchemas[id]);
    const asCopiable = rawChildren?.some(child => child.copiable);
    const children =
      rawChildren?.map((child, idx) => traverse(child, [...breadcrumbs, ...(asCopiable ? [idx] : [])])) ||
      void 0;
    const field = flatFields[field_id];
    const stableId = `${id}|${breadcrumbs.join('|') || 0}`;
    if (!field) throw new Error('buildtree failed: invalid field_id ' + field_id);
    return { stableId, ...schema, field, asCopiable, children };
  };

  const rootSchema = schemas.find(item => !item.parent_id);
  if (!rootSchema) throw new Error('buildtree failed: No root schema found!');

  const result = traverse(rootSchema, []);

  // check unvisited schema
  if (touchedSchema.size !== schemas.length) {
    const orphaned = schemas.find(schema => !touchedSchema.has(schema.id));
    throw new Error('buildtree failed: Possible orphaned schema found: ' + (orphaned?.id || 'Unknown'));
  }
  return result;
};
