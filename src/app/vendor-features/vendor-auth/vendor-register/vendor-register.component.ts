import { Component, Inject } from "@angular/core";
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { VendorAuthService } from "../../services/vendor-auth.service";
import { MenuItem, MessageService } from "primeng/api";
import { LocalStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";
import { VendorRegisterModel } from "../../models/vendor-register.models";
import { VendorCommonService } from "../../services/vendor-common-service";
import { Contact, Currency, Supply } from "../../models";

export enum RegistrationType {
    Company = "1",
    Individual = "2",
}

@Component({
    selector: "app-vendor-register",
    templateUrl: "./vendor-register.component.html",
    styleUrls: ["./vendor-register.component.scss"],
})
export class VendorRegisterComponent {
    vendorForm: FormGroup | undefined;
    registrationType = RegistrationType;
    selectedRegistration: RegistrationType = RegistrationType.Company;
    currencies: Currency[] | undefined;
    items: MenuItem[];
    activeIndex: number = 0;
    formIsSubmitting: boolean = false;
    taxTreatments: any = [];

    constructor(
        private fb: FormBuilder,
        private vendorAuthService: VendorAuthService,
        private message: MessageService,
        private storage: LocalStorageService,
        private vendorCommonService: VendorCommonService,
        private router: Router
    ) {
        this.vendorForm = this.fb.group({
            intVendorType: [RegistrationType.Company, Validators.required],
            vaCompanyName: ["", Validators.required],
            countryUID: ["", Validators.required],
            uiCompanyState: ["", Validators.required],
            vaVendorName: [""],
            workContactCountryCodeUID: ["", Validators.required],
            vaContactNo: [
                "",
                [Validators.required, Validators.pattern("^[0-9]*$")],
            ],
            vaContactPersonName: ["", Validators.required],
            vaDesignation: [""],
            vaContactPersonMailID: [
                "",
                [Validators.required, Validators.email],
            ],
            // DocumentDetails: this.fb.array([this.createDocumentDetail()]),
            vaTRN: [null],
            uiTaxTreatmentID: [null],
            supplierCountryUID: [null],
            uiCurrencyID: [null],
            tradeLicenseRemarks: [""],
            ultimateBeneficiaryRemarks: [""],
            bankStatementRemarks: [""],
            shareHolderDocumentRemarks: [""],
            taxDocumentRemarks: [""],
            isTermsAccepted: [false, Validators.requiredTrue],
        });
    }

    ngOnInit() {
        this.loadCurrencies();
        this.getCountryMaster();
        // Subscribe to changes in conditionField to dynamically update requiredField validators
        this.vendorForm
            .get("intVendorType")
            ?.valueChanges.subscribe((value) => {
                this.updateRequiredFieldValidators(value);
            });

        this.getCountryMaster();
        this.getTaxTreatmentMaster();

        this.items = [
            {
                label: "Basic Info",
                command: (event: any) => {
                    this.activeIndex = 0;
                },
            },
            {
                label: "Additional Info",
                command: (event: any) => {
                    this.activeIndex = 1;
                },
            },
            // {
            //     label: "Profile Management",
            //     command: (event: any) => {
            //         this.activeIndex = 2;
            //     },
            // },
            {
                label: "Upload Document",
                command: (event: any) => {
                    this.activeIndex = 2;
                },
            },
            // {
            //     label: "2FA",
            //     command: (event: any) => {
            //         this.activeIndex = 3;
            //     },
            // },
        ];
    }

    taxDocument: any = null;
    shareholderDocument: any = null;
    bankStatement: any = null;
    ultimateBeneficiary: any = null;
    tradeLicense: any = null;
    taxDocumentName: any = null;
    shareholderDocumentName: any = null;
    bankStatementName: any = null;
    ultimateBeneficiaryName: any = null;
    tradeLicenseName: any = null;

    submitVendorInfo() {
        this.vendorForm.markAllAsTouched();
        if (this.vendorForm.valid) {
            const vendorInfo: VendorRegisterModel = this.vendorForm.value;
            // if (!vendorInfo.DocumentDetails[0].DocumentBase64) {
            //     delete vendorInfo.DocumentDetails; // api not supporting yet
            // }

            if (this.tradeLicense == null) {
                this.message.add({
                    severity: "error",
                    summary: "Alert",
                    detail: "Please upload Trade License.",
                });

                return;
            } else if (this.ultimateBeneficiary == null) {
                this.message.add({
                    severity: "error",
                    summary: "Alert",
                    detail: "Please upload Ultimate Beneficiary.",
                });

                return;
            } else if (this.taxDocument == null) {
                this.message.add({
                    severity: "error",
                    summary: "Alert",
                    detail: "Please upload Tax Document.",
                });

                return;
            }

            // const documents = [
            //     { type: this.taxDocument, name: "taxDocument" },
            //     {
            //         type: this.shareholderDocument,
            //         name: "shareholderDocument",
            //     },
            //     { type: this.bankStatement, name: "bankStatement" },
            //     {
            //         type: this.ultimateBeneficiary,
            //         name: "ultimateBeneficiary",
            //     },
            //     { type: this.tradeLicense, name: "tradeLicense" },
            // ];

            vendorInfo["ultimateBeneficiaryAttatchmentUID"] = this.ultimateBeneficiary;
            vendorInfo["bankStatementAttatchmentUID"] = this.bankStatement;
            vendorInfo["tradeLicenseAttatchmentUID"] = this.tradeLicense;
            vendorInfo["shareHolderAttatchmentUID"] = this.shareholderDocument;
            vendorInfo["taxDocumentAttatchmentUID"] = this.taxDocument;
            if(vendorInfo['vaVendorName'] == '' || vendorInfo['vaVendorName'] == null ){
                vendorInfo['vaVendorName'] == vendorInfo['vaCompanyName']
            }

            this.formIsSubmitting = true;
            this.vendorAuthService.register(vendorInfo).subscribe((res) => {
                console.log(res);
                if (res?.responseResult?.ResponseMessage === "SUCCESS") {
                    let employee_id = res.Data.uiContactId;
                    // documents.forEach((doc) => {
                    //     if (doc.type != null) {
                    //         this.uploadDocuments(employee_id, doc.type);
                    //     }
                    // });

                    this.formIsSubmitting = false;
                    // console.log(res);
                    this.message.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Register successfully",
                    });

                    this.router.navigate(["/vendor"]);

                    // this.storage.store('accessToken', res.data.accessToken)
                    // this.storage.store('refreshToken', res.data.refreshToken)
                    // this.storage.store('userInfo', res.data.userInfo[0]);
                    // // this.storage.store('activeCompany', res.data.userInfo[0]?.defaultCompanyUID);
                    // // this.sharedService.setCompanyUid({ activeCompany: res.data.userInfo[0]?.defaultCompanyUID })

                    this.router.navigate(["/vendor"]);
                } else {
                    this.formIsSubmitting = false;
                    this.message.add({
                        severity: "error",
                        summary: "Alert",
                        detail: res.responseResult.ResponseMessage,
                    });
                }
            });
        } else {
            this.formIsSubmitting = false;
            if (this.vendorForm.get("workContactCountryCodeUID").value == "") {
                this.message.add({
                    severity: "error",
                    summary: "Alert",
                    detail: "Please Work Contact Number Country Code.",
                });
            }
            this.message.add({
                severity: "error",
                summary: "Alert",
                detail: "Please fill in the required fields.",
            });
        }
    }

    onFileChange(event: any, type: any): void {
        let fileName = event.target.files[0];
        console.log(fileName);
        if (
            fileName.type === "image/png" ||
            fileName.type === "image/jpeg" ||
            fileName.type === "image/jpg" ||
            fileName.type === "application/pdf" ||
            fileName.type === "pdf"
        ) {
            if (fileName.size > 10000000) {
                this.message.add({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Maximun allowed file size 10 MB",
                });
            } else {
                this[`${type}Name`] = fileName;
                this.uploadDocuments(null, fileName, type);
            }
        } else {
            this.message.add({
                severity: "warn",
                summary: "Warning",
                detail: "Only PDF/PNG/JPEG/JPG files allowed",
            });
        }
    }

    uploadDocuments(employee_id: any, fileName: any, type: any) {
        let file = new FormData();
        file.append("EmployeeUID", employee_id);
        file.append("CertificateFileName", fileName);
        this.formIsSubmitting = true
        this.vendorCommonService.uploadDocuments(file).subscribe(
            (res: any) => {
                this.formIsSubmitting = false
                console.log(res);
                if (res.responseResult.responseCode == "000") {
                    this[`${type}`] = res.fileInfo.attatchmentUID;
                    this.message.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Document uploaded successfully",
                    });
                } else {
                    this.message.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.responseResult.responseDescription,
                    });
                }
            },
            (err: any) => {
                this.formIsSubmitting = false
                // console.log(err)
                this.message.add({
                    severity: "error",
                    summary: "Error",
                    detail: "Something went wrong",
                });
            }
        );
    }

    onRegistrationTypeChange(type: RegistrationType): void {
        this.selectedRegistration = type;
    }

    loadCurrencies() {
        this.vendorCommonService.getCurrencies().subscribe((res: any) => {
            if (res.responseResult.responseDescription === "SUCCESS") {
                this.currencies = res.MasterDetails;
            }
        });
    }

    // onFileChange(event: any, type: any): void {
    //     const file = event.target.files[0];
    //     if (file) {
    //         this.convertToBase64(file);
    //     }
    // }

    convertToBase64(file: File): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.updateFormDocumentData(file.name, reader.result);
        };

        reader.readAsDataURL(file);
    }

    private updateFormDocumentData(
        fileName: string,
        base64Data: string | ArrayBuffer
    ) {
        const documentDetails = this.vendorForm.get(
            "DocumentDetails"
        ) as FormArray;
        const updatedDocumentDetail = documentDetails.at(0);

        // Update the DocumentDetails array[0] with the current form values
        updatedDocumentDetail.patchValue({
            vaDocumentTitle: "",
            vaDocumentOrginalFileName: fileName,
            DocumentBase64: base64Data,
        });
    }

    private createDocumentDetail(): FormGroup {
        return this.fb.group({
            vaDocumentTitle: [""],
            vaDocumentOrginalFileName: [""],
            DocumentBase64: [""],
            // DocumentBase64: ['', Validators.required]
        });
    }

    private updateRequiredFieldValidators(value: string): void {
        const requiredField = this.vendorForm.get("vaCompanyName");

        if (value === RegistrationType.Individual) {
            // Set as required if Individual
            requiredField?.setValidators([Validators.required]);
        } else {
            // Clear validators if not Individual
            requiredField?.clearValidators();
        }

        // Refresh the validation status of the requiredField
        requiredField?.updateValueAndValidity();
    }

    countryList: any = [];
    countryCodeList: any = [];
    getCountryMaster() {
        const data = {
            countryVisibility: "yes",
        };

        this.vendorCommonService.getCountryList(data).subscribe((res: any) => {
            if (res && res.Data) {
                this.countryList = res.Data;
                this.countryCodeList = res.Data;
                this.countryCodeList.forEach(
                    (country: {
                        formattedCountry: string;
                        countryCode: string;
                        countryName: string;
                    }) => {
                        country.formattedCountry =
                            country.countryCode +
                            " (" +
                            country.countryName +
                            ")";
                    }
                );
            }
        });
    }

    getTaxTreatmentMaster() {
        const data = {};
        this.vendorCommonService
            .postData("api/Master/fetch-tax-treatment", data)
            .subscribe((res: any) => {
                if (res.responseResult.responseDescription === "SUCCESS") {
                    this.taxTreatments = res.TaxTreatment;
                }
            });
    }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    nextStep() {
        if (this.activeIndex < this.items.length - 1) {
            this.activeIndex++;
        }
    }

    previousStep() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        }
    }

    onChangeCountry(event: any) {
        //debugger;;
        const countryCode = event.value;
        if (countryCode) {
            this.getPresentStateList(countryCode);
        }
    }

    stateList = [];
    getPresentStateList(countryCode) {
        const data = {
            countryUID: countryCode,
            stateVisibility: "Yes",
        };

        this.stateList = [];
        this.vendorCommonService.getStateList(data).subscribe((res: any) => {
            if (res && res.MasterDetails) {
                this.stateList = res.MasterDetails || [];
            }
        });
    }

    carouselData = [
        {
            title: "Transform Cool Data",
            desc: "Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.",
        },
        {
            title: "Transform Cool Data",
            desc: "Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.",
        },
        {
            title: "Transform Cool Data",
            desc: "Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.",
        },
        {
            title: "Transform Cool Data",
            desc: "Make informed decisions with Cusanas powerful analytics tools.Harness the power of data to drive your business forward with Cusana Analytics.",
        },
    ];
}
