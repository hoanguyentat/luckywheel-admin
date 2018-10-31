export class SubscriberModel {

    constructor (subcriber) {
        this.email = subcriber.email || null;
        this.shopId = subcriber.shopId || null;
        this.id = subcriber.id || null;
        this.fullName = subcriber.fullName || null;
        this.campaignName = subcriber.campaignName || null;
        this.discountCode = subcriber.discountCode || null;
        this.campaignId = subcriber.campaignId || null;
        this.createdAt = subcriber.createdAt || null;
    }

    email;
    shopId;
    id;
    fullName;
    campaignName;
    discountCode;
    campaignId;
    createdAt;
}