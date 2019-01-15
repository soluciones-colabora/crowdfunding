
export interface Donnor {
  // Google Profile Info
  uid?:          any;
  role?:         string;
  createdOn?:    Date;
  status?:       string;

  // Personal Data
  name?:         string;
  email?:        string;
  phone?:        string;
  occupation?:   string;
  gender?:       string;
  birthdate?:    Date;
  country?:      string;
  postalCode?:   number;


  // Interests
  interests?:    object;
}
