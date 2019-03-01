export class CustomerInfo {
    companyId: number;
    companyName: string;
    parentId: number;
    parentName: string;
    adjustedObcCount: number;
    obcCount: number;
    safetyStock: number;
    customerManager: string;
    ramNasVas: string;
    salesRep: string;
    customerType: string;
    ratePlan: string;
    unitSuspendedMonths: string;
    returnOnly: number;
    standardRma: number;
    mmUpgrade: number;
    predatesNetsuite: boolean;
    obcCountAsOf: string;
    custDateAsOf: string;
    contactReviewComplete: boolean;
    lastReviewDate: string;
    reviewNotes: string;
    unitContractDiff: number;
    accountManager: string;

    loadData(data: any){
        this.companyId              = data.companyId;
        this.companyName             = data.companyName;
        this.parentId                = data.parentId;
        this.parentName              = data.parentName;
        this.adjustedObcCount        = data.adjustedObcCount;
        this.obcCount                = data.obcCount;
        this.safetyStock             = data.safetyStock;
        this.customerManager         = data.customerManager;
        this.ramNasVas               = data.ramNasVas;
        this.salesRep                = data.salesRep;
        this.customerType            = data.customerType;
        this.ratePlan                = data.ratePlan;
        this.unitSuspendedMonths     = data.unitSuspendedMonths;
        this.returnOnly              = data.returnOnly;
        this.standardRma             = data.standardRma;
        this.mmUpgrade               = data.mmUpgrade
        this.predatesNetsuite        = data.predatesNetsuite;
        this.obcCountAsOf            = data.obcCountAsOf;
        this.custDateAsOf            = data.custDateAsOf;
        this.contactReviewComplete   = data.contactReviewComplete;
        this.lastReviewDate          = data.lastReviewDate;
        this.reviewNotes             = data.reviewNotes;
        this.unitContractDiff        = data.unitContractDiff;
        this.accountManager          = data.accountManager;
    }
}