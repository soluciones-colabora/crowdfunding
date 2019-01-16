
export interface Association {
  // DB Info
  uid?:      any;
  role?:        string;
  createdOn?:  Date;
  status?:      string;

  // Basic information
  email?:    string;
  name?:     string;
  acname?:   string;
  cluni?:    string;
  isDonnor?: string;
  logo?:     string;

  // Address
  address?:    string;
  postalCode?: number;
  state?:      string;
  locality?:  string;
  cellphone?:  string;
  phone?:      string;

  // About the association...
  summary?:        string;
  mission?:        string;
  vision?:         string;
  values?:         string;
  beneficiaries?:  string;
  changeTheory?:   string;
  ODS?:            string;
  awards?:         string;
  products?:         [];

  // Team and networks
  video?:          string;
  cert?:           string;
  team?:           [];
  socialNetworks?: [];
  gallery?:        [];


}

