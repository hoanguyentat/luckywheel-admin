export class CampaignModel {

    constructor(campaign) {
        {
            this.updatedAt      = campaign.updatedAt || null;
            this.shopId    = campaign.shopId || null;
            this.id = campaign.id || null;
            this.startedAt   = campaign.startedAt || null;
            this.active    = campaign.active || null;
            this.description = campaign.description || null;
            this.name = campaign.name || false;
            this.metadata  = campaign.metadata || false;
            this.slides       = campaign.slides || [];
            this.completedAt     = campaign.completedAt || null;
            this.winProbability   = campaign.winProbability || null;
            this.createdAt    = campaign.createdAt || null;
        }
    }
    updatedAt;
    shopId;
    id;
    startedAt;
    active;
    description;
    name;
    metadata;
    slides;
    completedAt;
    winProbability;
    createdAt;

    toggleActive(): void
    {
        this.active = !this.active;
    }
}