import {
  AnyZodObject,
  array as a,
  boolean as b,
  discriminatedUnion as dU,
  infer as zodInfer,
  literal as l,
  number as n,
  object as o,
  string as s,
  enum as e,
} from 'zod';
const REG_UUID = /^[a-f0-9]{32}$/;
const uuid = s().trim().regex(REG_UUID, 'Not a valid UUID (all lowercase, 0~f)');
const _ = <T extends AnyZodObject>(t: T) => o({ id: uuid }).merge(t); // common field factory

export const schemaValidator = o({
  id: uuid,
  field_type_id: uuid,
  name: s(),
  parent_id: uuid.nullable(),
  placeholder: s().nullable().optional(),
  copiable: b().nullable().optional(), // true = converts parent to an array
  nullable: b().nullable().optional(),
  hint: s().nullable().optional(),
  display_order: n().int().nonnegative().nullable().optional(),
});

export const fieldValidator = o({
  id: uuid,
  type: e([
    'box',
    'string',
    'url',
    'integer',
    'boolean',
    'text',
    'search_campaign',
    'search_project',
    'search_artist',
    'search_city',
    'array_string',
    'datetime',
    'integer_unlimited',
    'radio_with_custom',
    'dropdown',
  ]),
  options: a(s()).nullable(),
});

// export const fieldValidator = dU('type', [
//   _(o({ type: l('box') })),
//   _(o({ type: l('string'), value: s().trim() })),
//   _(o({ type: l('text'), value: s() })),
//   _(o({ type: l('url'), value: s().trim().url() })),
//   _(o({ type: l('search_city'), value: s().trim() })),
//   _(o({ type: l('search_project'), value: uuid })),
//   _(o({ type: l('search_campaign'), value: uuid })),
//   _(o({ type: l('search_artist'), value: uuid })),
//   _(o({ type: l('array_string'), value: a(s()) })),
//   _(o({ type: l('boolean'), value: b().nullable() })), // null: "TBD"
//   _(o({ type: l('integer'), value: n().int().nonnegative() })),
//   _(o({ type: l('integer_unlimited'), value: n().int().gte(-1) })), // -1: unlimited
//   _(o({ type: l('number'), value: n().nonnegative() })),
//   _(o({ type: l('number_unlimited'), value: n().gte(-1) })), // -1: unlimited
//   _(o({ type: l('dropdown'), value: s(), options: a(s()) })),
//   _(o({ type: l('dropdown_custom'), value: s(), options: a(s()) })),
//   _(o({ type: l('radio'), value: s(), options: a(s()) })),
//   _(o({ type: l('radio_with_custom'), value: s(), options: a(s()) })),
//   _(o({ type: l('datetime'), value: s().trim() })),
// ]);

// s_id  << schema ??? id
const payload = {
  flattened: {
    // value ??? ?????? field ??? flat?????? ????????????
    '{s_id_1}|0': { value: 'theartistuuid', confirmed: true },
    '{s_id_2}|0': { value: 'The Awesome Tour', confirmed: true },
    '{s_id_3}|0': { value: 'America', confirmed: true },
    '{s_id_4}|0': { value: 8, confirmed: true },
    '{s_id_7}|0': { value: 'selloff', confirmed: false },
    '{s_id_7}|1': { value: 'mmt', confirmed: true },
    '{s_id_8}|0': { value: 'Seoul', confirmed: false },
    '{s_id_8}|1': { value: 'London', confirmed: false },
    '{s_id_11}|0': { value: 'VeryGood M&G', confirmed: true },
    '{s_id_12}|0': { value: '{project_id}', confirmed: true },
    '{s_id_15}|1': { value: 'With teaser', confirmed: true },
    '{s_id_21}|1|0': { value: 'VVIP tier', confirmed: true },
    '{s_id_21}|1|1': { value: 'Gold tier', confirmed: true },
    '{s_id_21}|1|2': { value: 'General Sale', confirmed: true },
    //         ^ "1??? show??? 2?????? s_id_21"
    // ...
  },

  // ?????? box??? dict, copiable??? ?????? box??? array, field ??? Field??? ??????
  structured: {
    '{s_id_0}': {
      // [Box] basic info
      '{s_id_1}': { value: 'theartistuuid', confirmed: false },
      '{s_id_2}': { value: 'The Awesome Tour', confirmed: false },
      '{s_id_3}': { value: 'America', confirmed: false },
      '{s_id_4}': { value: 8, confirmed: false },
    },
    '{s_id_5}': [
      // [Box] shows (w/copiable)
      {
        // [Box.Copiable] sell-off show (idx: 0)
        '{s_id_6}': {
          // [Box] basic info
          '{s_id_7}': { value: 'selloff', confirmed: false },
          '{s_id_8}': { value: 'Seoul', confirmed: false },
        },
        '{s_id_9}': {
          // [Box] M&G
          '{s_id_10}': {
            // [Box] M&G.basic info
            '{s_id_11}': { value: 'VeryGood M&G', confirmed: false },
            '{s_id_12}': { value: '{project_id}', confirmed: true },
          },
        },
      },
      {
        // [Box.Copiable] mmt show (idx: 1)
        '{s_id_13}': {
          // [Box] basic info
          '{s_id_7}': { value: 'mmt', confirmed: true },
          '{s_id_8}': { value: 'London', confirmed: false },
        },
        '{s_id_14}': {
          // [Box] announcement info
          '{s_id_15}': { value: 'With teaser', confirmed: true },
        },
        // ...
        '{s_id_20}': [
          // [Box] Ticket info list (w/copiable)
          {
            // [Box.Copiable] Ticket info (idx: 1|1)
            '{s_id_21}': { value: 'VVIP tier', confirmed: true },
          },
          {
            // [Box.Copiable] Ticket info (idx: 1|2)
            '{s_id_21}': { value: 'Gold tier', confirmed: true },
          },
          {
            // [Box.Copiable] Ticket info (idx: 1|3)
            '{s_id_21}': { value: 'General Sale', confirmed: true },
          },
        ],
      },
    ],
  },
};

export type Schema = zodInfer<typeof schemaValidator>;
export type Field = zodInfer<typeof fieldValidator>;

export type ParsedSchema = { stableId: string } & Schema & {
    children?: ParsedSchema[];
    asCopiable: boolean;
    field: Field;
  };
