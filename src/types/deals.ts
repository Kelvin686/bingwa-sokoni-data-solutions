export type DealCategory = 'all' | 'bingwa-data' | 'minutes' | 'sms' | 'tunukiwa';

export interface Deal {
  id: string;
  category: DealCategory;
  categoryLabel: string;
  title: string;
  price: number;
  validity: string;
  quota: string;
  unit: string;
  bonus?: string;
  frequency: 'Buy Once in a Day' | 'Buy Many Times in a Day';
  popular?: boolean;
  bestValue?: boolean;
  description: string;
  flyerSection: string;
}

export interface Hotspot {
  id: string;
  category: DealCategory;
  title: string;
  subtitle: string;
  dealsCount: number;
  rect: {
    top: number; // percentage
    left: number; // percentage
    width: number; // percentage
    height: number; // percentage
  };
}

export interface PurchaseOrder {
  id: string;
  transactionCode: string;
  dealId: string;
  dealTitle: string;
  dealCategory: string;
  quota: string;
  validity: string;
  amount: number;
  phoneNumber: string;
  paymentMethod: 'till_manual';
  tillNumber: string;
  timestamp: string;
  status: 'completed' | 'processing' | 'failed';
  note?: string;
}
