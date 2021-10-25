const {FireblocksSDK} = require("fireblocks-sdk");
let logDataInSystem = require("../helper/apiHelper");
let providerErrorLog = require('../helper/logHelper').providerErrorLog;

module.exports = class FireBlockAPI {
    constructor(apiSecret, apiKey) {
        this.fireBlockSDK = new FireblocksSDK(apiSecret, apiKey);
    }

    getVaults(request, callback) {
        this.fireBlockSDK.getVaultAccounts(request).then(vaults => {
            callback(null, vaults)
        }).catch(error => {  
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getVaults",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        });
    }

    getVaultById(request, callback) {
        let vaultID = request.vaultID;
        this.fireBlockSDK.getVaultAccountById(vaultID).then(vaults => {
            callback(null, vaults)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getVaultById",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    createNewVault(request, callback) {
        let name = request.name,
            hiddenOnUI = request.hiddenOnUI,
            customerRefId = request.customerRefId,
            autoFueling = request.autoFueling;
        this.fireBlockSDK.createVaultAccount(name, hiddenOnUI, customerRefId, autoFueling).then(Vault => {
            
            logDataInSystem.storeVaultData(Vault,function(err,result){
                
                if(!err && result)
                {
                    callback(null, Vault);
                } else {
                    let errorInfo = {
                        statusCode : 200,
                        error : err.toString()
                    };
                    callback(errorInfo);
                }
            });             
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","createNewVault",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    updateVaultAccout(request, callback) {
        let vaultID = request.vaultAccountId;
        let name = request.name;        
        this.fireBlockSDK.updateVaultAccount(vaultID, name).then(Accounts => {
            callback(null, Accounts)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","updateVaultAccout",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getVaultAssetBalance(request, callback) {
        let vaultID = request.vaultID;
        let assetId = request.assetId;
        this.fireBlockSDK.getVaultAccountAsset(vaultID, assetId).then(AssetBalance => {
            callback(null, AssetBalance)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getVaultAssetBalance",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    addAssetIntoVault(request, callback) {
        let vaultID = request.vaultID;
        let assetId = request.assetId;
        this.fireBlockSDK.createVaultAsset(vaultID, assetId).then(assetDetails => {
            let insertData = {};
            insertData.vaultID = vaultID;
            insertData.assetId = assetId;
            insertData.assetDetails = assetDetails;
            logDataInSystem.storeVaultToAssetMap(insertData,function(err,result){
                
                if(!err && result)
                {
                    callback(null, assetDetails);
                } else {
                    let errorInfo = {
                        statusCode : 200,
                        error : err.toString()
                    };
                    callback(errorInfo);
                }
            });            
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","addAssetIntoVault",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getDepositeAddress(request, callback) {
        let vaultID = request.vaultID;
        let assetId = request.assetId;
        this.fireBlockSDK.getDepositAddresses(vaultID, assetId).then(address => {
            callback(null, address)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getDepositeAddress",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    generateDepositeAddress(request, callback) {
        let vaultID = request.vaultID;
        let assetId = request.assetId;
        this.fireBlockSDK.generateNewAddress(vaultID, assetId).then(depositeAddresses => {
            callback(null, depositeAddresses)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","generateDepositeAddress",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getMaximumSpendingAmount(request, callback) {
        let vaultID = request.vaultID;
        let assetId = request.assetId;
        this.fireBlockSDK.getMaxSpendableAmount(vaultID, assetId).then(spendingAmount => {
            callback(null, spendingAmount)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getMaximumSpendingAmount",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getAllInternalWalletList(request,callback) {
        this.fireBlockSDK.getInternalWallets().then(wallet => {
            callback(null, wallet)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getAllInternalWalletList",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    removeInternalWalletByID(walletId, callback) {
        this.fireBlockSDK.deleteInternalWallet(walletId).then(wallet => {
            callback(null, wallet)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","removeInternalWalletByID",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    createNewInternalWallet(request, callback) {
        let name = request.name;
        let customerRefId = "";
        this.fireBlockSDK.createInternalWallet(name, customerRefId).then(wallet => {
            
            logDataInSystem.storeInternalWalletData(wallet,function(err,result){
                
                if(!err && result)
                {
                    callback(null, wallet)
                } else {
                    let errorInfo = {
                        statusCode : 200,
                        error : err.toString()
                    };
                    callback(errorInfo);
                }
            });            
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","createNewInternalWallet",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }    

    assignAssetToInternalWallet(request, callback) {
        let walletId = request.walletId;
        let assetId = request.assetId;
        let address = request.address;
        let tag = request.tag ? request.tag:"";
        this.fireBlockSDK.createInternalWalletAsset(walletId, assetId, address, tag).then(wallet => {
            callback(null, wallet)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","assignAssetToInternalWallet",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getInternalWallet(request,callback) {
        let walletId = request.walletId;
        this.fireBlockSDK.getInternalWallet(walletId).then(wallet  => {
            console.log("wallet",wallet);
            callback(null, wallet)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getInternalWallet",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        });
    }    

    getInternalWalletByAsset(request, callback) {
        let walletId = request.walletId;
        let assetId = request.assetId;
        this.fireBlockSDK.getInternalWalletAsset(walletId, assetId).then(assetList => {
            callback(null, assetList)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getInternalWalletByAsset",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    removeAssestFromInternalWallet(walletId, assetId, callback) {
        this.fireBlockSDK.deleteInternalWalletAsset(walletId, assetId).then(assetList => {
            callback(null, assetList)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","removeAssestFromInternalWallet",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getAllExternalWalletList(request,callback) {        
        this.fireBlockSDK.getExternalWallets().then(wallet  => {
            callback(null, wallet)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getAllExternalWalletList",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        });
    }

    getExternalWallet(request,callback) {
        let walletId = request.walletId;
        this.fireBlockSDK.getExternalWallet(walletId).then(wallet  => {
            callback(null, wallet)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getExternalWallet",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        });
    }    

    createNewExternalWallet(request, callback) {
        let name = request.name;
        let customerRefId = "";
        this.fireBlockSDK.createExternalWallet(name, customerRefId).then(wallet  => {
            logDataInSystem.storeExternalWalletData(wallet,function(err,result){
                
                if(!err && result)
                {
                    callback(null, wallet)
                } else {
                    let errorInfo = {
                        statusCode : 200,
                        error : err.toString()
                    };
                    callback(errorInfo);
                }
            });
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getAllExternalWalletList",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        });
    } 
    
    getExternalWalletByAsset(request, callback) {
        let walletId = request.walletId;
        let assetId = request.assetId;
        this.fireBlockSDK.getExternalWalletAsset(walletId, assetId).then(assetList => {
            callback(null, assetList)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getInternalWalletByAsset",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    assignAssetToExternalWallet(request, callback) {
        let walletId = request.walletId;
        let assetId = request.assetId;
        let address = request.address;
        let tag = request.tag ? request.tag:"";
        this.fireBlockSDK.createExternalWalletAsset(walletId, assetId, address, tag).then(wallet => {
            callback(null, wallet)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","assignAssetToInternalWallet",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getTransactionList(request, callback) {
        this.fireBlockSDK.getTransactions(request).then(transactionList => {
            callback(null, transactionList)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getTransactionList",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getTransactionDetailsById(request, callback) {
        this.fireBlockSDK.getTransactionById(request.txId).then(transactionList => {
            callback(null, transactionList)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getTransactionDetailsById",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getTransactionDetailsByExternalID(request, callback) {
        this.fireBlockSDK.getTransactionByExternalTxId(request.txId).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getTransactionDetailsByExternalID",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    validateDestinationAddress(assetId, address, callback) {
        this.fireBlockSDK.validateAddress(assetId, address).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","validateDestinationAddress",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getEstimateAssetNetworkFees(reqeust, callback) {
        this.fireBlockSDK.getFeeForAsset(reqeust.assetId).then(fees => {
            callback(null, fees)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getAssetFees",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getEstimateTransactionFees(request, callback) {        
        this.fireBlockSDK.estimateFeeForTransaction(request).then(fees => {
            callback(null, fees)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getEstimateFees",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getSupportedAssetList(callback) {
        this.fireBlockSDK.getSupportedAssets().then(assetLists => {
            callback(null, assetLists)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getSupportedAssetList",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    createTransaction(request,callback) {
        
        this.fireBlockSDK.createTransaction(request).then(TransactionResponse => {
            logDataInSystem.storeWithdrawTransactionData(request,TransactionResponse,function(err,result){
                if(!err && result)
                {
                    callback(null, TransactionResponse)
                } else {
                    let errorInfo = {
                        statusCode : 200,
                        error : err.toString()
                    };
                    callback(errorInfo);
                }
            });            
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","createTransaction",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        })
    }

    getDepoistTransactionList(request,callback) {
        let paginationURL = "";
        if(typeof request.pageurl != undefined && request.pageurl != "")
        {
            paginationURL = request.pageurl;
        }
        this.fireBlockSDK.getTransactionsWithPageInfo(request,paginationURL).then(transactionList => {
            callback(null, transactionList)
        }).catch(error => {
            let errorInfo = {
                statusCode : error.statusCode,
                error : error.error
            };            
            providerErrorLog("fireblocks","getDepoistTransactionList",{},JSON.stringify(errorInfo));
            callback(errorInfo);
        });        
    }
}

