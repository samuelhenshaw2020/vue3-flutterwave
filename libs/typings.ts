interface ICustomer {
    email?: string,
    phone_number?: string,
    name?: string,
}

interface ICustomizations {
    title?: string,
    description?: string,
    logo?: string,
}

interface IMeta {
    [key: string]: string | number | symbol | any
}

export interface IFWOptions {
    public_key?: string,
    tx_ref?: string,
    amount?: number,
    currency?: string,
    payment_options?: string | null,
    redirect_url?: string | null,
    meta?: IMeta | null,
    customer?: ICustomer | null,
    customizations?: ICustomizations | null
}

