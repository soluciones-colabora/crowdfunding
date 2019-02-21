
export interface Campaign {
  title?: string;
  logo?: any;
  description?: string;

  // Common questions about this campaign
  duration?: number;
  objective?: string;
  moneyUsage?: string;

  // Money
  goal?: number;
  amountcollected?: number;
  numberdonors?: number;

  // This can be calculated
  timeRemaining?: number;
  percentage?: number;

  rating?: number;

  id?:          any;
  assocUid?:     any;
  status?:       string;
  createdOn?:    Date;
  updatedOn?:    Date;
  endsOn?:       Date;
}
