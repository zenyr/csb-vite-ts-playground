import { Field, Schema } from './model';

const SCHEMA_BOXES: Schema[] = [
  // Tour info
  { id: 's_b_0', name: 'Tour Info', parent_id: null, field_id: 'f_box' },
  { id: 's_b_1', name: 'Basic Info', parent_id: 's_b_0', field_id: 'f_box' },
  { id: 's_b_2', name: 'Operator Info', parent_id: 's_b_0', field_id: 'f_box' },
  { id: 's_b_3', name: 'Artist Info', parent_id: 's_b_0', field_id: 'f_box' },

  // Shows
  { id: 's_b_4', name: 'Show List', parent_id: 's_b_0', field_id: 'f_box' },

  // Shows-Selloff
  { id: 's_b_5', name: 'Selloff Show', parent_id: 's_b_4', field_id: 'f_box', copiable: true },
  { id: 's_b_6', name: 'Basic Info', parent_id: 's_b_5', field_id: 'f_box' },
  { id: 's_b_7', name: 'Announcement Info', parent_id: 's_b_5', field_id: 'f_box' },
  { id: 's_b_8', name: 'General Sale', parent_id: 's_b_5', field_id: 'f_box' },

  // Shows-Selloff-M&G
  { id: 's_b_9', name: 'M&G (Sell-off)', parent_id: 's_b_5', field_id: 'f_box' },
  { id: 's_b_10', name: 'Basic Info', parent_id: 's_b_9', field_id: 'f_box' },
  { id: 's_b_11', name: 'Announcement Info', parent_id: 's_b_9', field_id: 'f_box' },
  { id: 's_b_12', name: 'Event Info', parent_id: 's_b_9', field_id: 'f_box' },
  { id: 's_b_13', name: 'Perks Info', parent_id: 's_b_9', field_id: 'f_box' },

  // Shows-MMT
  { id: 's_b_14', name: 'MMT Show', parent_id: 's_b_4', field_id: 'f_box', copiable: true },
  { id: 's_b_15', name: 'Basic Info', parent_id: 's_b_14', field_id: 'f_box' },

  // Shows-MMT-Offline
  { id: 's_b_16', name: 'Offline', parent_id: 's_b_14', field_id: 'f_box', nullable: true },
  { id: 's_b_17', name: 'Basic Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_18', name: 'Announcement Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_19', name: 'Presale Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_20', name: 'Venue Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_21', name: 'General Sale', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_22', name: 'Queue Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_23', name: 'Local Partner Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_24', name: 'TasteMaker Benefit Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_25', name: 'Age Restriction', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_26', name: 'Top 10 Benefit Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_27', name: 'Ticketing Info', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_28', name: 'Accessable Seat', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_29', name: 'Assets', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_30', name: 'Wristband', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_31', name: 'On-site Passes', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_32', name: 'Ticket Site Info', parent_id: 's_b_16', field_id: 'f_box' },

  // Shows-MMT-Offline-TicketInfoList
  { id: 's_b_33', name: 'Ticket Info List', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_34', name: 'Ticket info', parent_id: 's_b_33', field_id: 'f_box', copiable: true },
  // Shows-MMT-Offline-SignedCdSaleList
  { id: 's_b_35', name: 'Signed CD Sale List', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_36', name: 'Signed CD Sale', parent_id: 's_b_35', field_id: 'f_box', copiable: true },
  { id: 's_b_37', name: 'Basic Info', parent_id: 's_b_36', field_id: 'f_box' },
  { id: 's_b_38', name: 'Announcement Info', parent_id: 's_b_36', field_id: 'f_box' },
  // Shows-MMT-Offline-ProductList
  { id: 's_b_39', name: 'Product List', parent_id: 's_b_16', field_id: 'f_box' },
  { id: 's_b_40', name: 'Product', parent_id: 's_b_39', field_id: 'f_box', copiable: true },
  { id: 's_b_41', name: 'Basic Info', parent_id: 's_b_40', field_id: 'f_box' },
  { id: 's_b_42', name: 'Asset Info', parent_id: 's_b_40', field_id: 'f_box' },

  // Shows-MMT-Online
  { id: 's_b_43', name: 'Online', parent_id: 's_b_14', field_id: 'f_box', nullable: true },
  { id: 's_b_44', name: 'Basic Info', parent_id: 's_b_43', field_id: 'f_box' },
  { id: 's_b_45', name: 'Announcement Info', parent_id: 's_b_43', field_id: 'f_box' },
  { id: 's_b_46', name: 'Show Info', parent_id: 's_b_43', field_id: 'f_box' },
  { id: 's_b_47x', name: 'Ticketing Info', parent_id: 's_b_43', field_id: 'f_box' },

  // Shows-MMT-Online-TicketInfoList
  { id: 's_b_47', name: 'Ticket Info List', parent_id: 's_b_43', field_id: 'f_box' },
  { id: 's_b_48', name: 'Ticket info', parent_id: 's_b_47', field_id: 'f_box', copiable: true },

  // Shows-MMT-MerchSale
  { id: 's_b_49', name: 'Merch Sale', parent_id: 's_b_14', field_id: 'f_box', nullable: true },
  { id: 's_b_50', name: 'Basic Info', parent_id: 's_b_49', field_id: 'f_box' },
  { id: 's_b_51', name: 'Announcement Info', parent_id: 's_b_49', field_id: 'f_box' },
  { id: 's_b_52', name: 'Merch Sale Info', parent_id: 's_b_49', field_id: 'f_box' },
  { id: 's_b_53', name: 'Online Order Pre-Order Info', parent_id: 's_b_49', field_id: 'f_box' },
  { id: 's_b_54', name: 'Online Order Post-Event Info', parent_id: 's_b_49', field_id: 'f_box' },
  { id: 's_b_55', name: 'Assets', parent_id: 's_b_49', field_id: 'f_box' },

  // Shows-MMT-MerchSale-ProductList
  { id: 's_b_56', name: 'Product List', parent_id: 's_b_49', field_id: 'f_box' },
  { id: 's_b_57', name: 'Product', parent_id: 's_b_56', field_id: 'f_box', copiable: true },

  // Shows-MMT-M&G
  { id: 's_b_58', name: 'M&G (MMT)', parent_id: 's_b_14', field_id: 'f_box', nullable: true },
  { id: 's_b_59', name: 'Basic Info', parent_id: 's_b_58', field_id: 'f_box' },
  { id: 's_b_60', name: 'Announcement Info', parent_id: 's_b_58', field_id: 'f_box' },
  { id: 's_b_61', name: 'Event Info', parent_id: 's_b_58', field_id: 'f_box' },
  { id: 's_b_62', name: 'Queue Info', parent_id: 's_b_58', field_id: 'f_box' },
  { id: 's_b_63', name: 'Concert Queue', parent_id: 's_b_58', field_id: 'f_box' },
  { id: 's_b_64', name: 'General Question', parent_id: 's_b_58', field_id: 'f_box' },

  // Shows-MMT-FanSign
  { id: 's_b_65', name: 'Fansign', parent_id: 's_b_14', field_id: 'f_box', nullable: true },
  { id: 's_b_66', name: 'Basic Info', parent_id: 's_b_65', field_id: 'f_box' },
  { id: 's_b_67', name: 'Announcement Info', parent_id: 's_b_65', field_id: 'f_box' },
  { id: 's_b_68', name: 'Event Info', parent_id: 's_b_65', field_id: 'f_box' },
  { id: 's_b_69', name: 'Venue Info', parent_id: 's_b_65', field_id: 'f_box' },
  { id: 's_b_70', name: 'Age Restrictions', parent_id: 's_b_65', field_id: 'f_box' },
  { id: 's_b_71', name: 'Assets', parent_id: 's_b_65', field_id: 'f_box' },
  { id: 's_b_72', name: 'General Question', parent_id: 's_b_65', field_id: 'f_box' },
];
const SCHEMA_FIELDS: Schema[] = [
  {
    id: 's_f_a_1',
    name: 'Artist Name',
    field_id: 'f_artist',
    parent_id: 's_b_1',
    placeholder: 'Search an artist name',
  },
  {
    id: 's_f_a_2',
    name: 'Official Tour Name',
    field_id: 'f_str',
    parent_id: 's_b_1',
  },
  {
    id: 's_f_a_3',
    name: 'Region',
    field_id: 'f_city',
    parent_id: 's_b_1',
  },
  {
    id: 's_f_a_4',
    name: 'Asset Link',
    field_id: 'f_url',
    parent_id: 's_b_1',
  },
];

const FIELDS: Field[] = [
  { id: 'f_box', type: 'box' },
  { id: 'f_str', type: 'string', value: '' },
  { id: 'f_artist', type: 'string_artist_id', value: '' },
  { id: 'f_city', type: 'string_city', value: '' },
  { id: 'f_int', type: 'string_city', value: '' },
  { id: 'f_url', type: 'string_url', value: '' },
];

export const SCHEMA_MOCK = {
  schemas: [...SCHEMA_BOXES, ...SCHEMA_FIELDS],
  fields: FIELDS,
};
