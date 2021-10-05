const {FireblocksSDK} = require("fireblocks-sdk");
let providerErrorLog = require('../helper/logHelper').providerErrorLog;

module.exports = class FireBlockAPI {
    constructor(apiSecret, apiKey) {
        this.fireBlockSDK = new FireblocksSDK(apiSecret, apiKey);
    }

    getVaults(request, callback) {
        this.fireBlockSDK.getVaultAccounts(request).then(vaults => {
            callback(null, vaults)
        }).catch(error => {  
            providerErrorLog("fireblock","getVaults",request,error.stack);          
            callback(error.toString());
        });
    }

    getVaultById(request, callback) {
        let vaultID = request.vaultID;
        this.fireBlockSDK.getVaultAccount(vaultID).then(vaults => {
            callback(null, vaults)
        }).catch(error => {
            providerErrorLog("fireblock","getVaultById",request,error.stack);
            callback(error.toString())
        })
    }

    createNewVault(request, callback) {
        let name = request.name,
            hiddenOnUI = request.hiddenOnUI,
            customerRefId = request.customerRefId,
            autoFueling = request.autoFueling;

        this.fireBlockSDK.createVaultAccount(name, hiddenOnUI, customerRefId, autoFueling).then(Vault => {
            callback(null, Vault)
        }).catch(error => {
            providerErrorLog("fireblock","createNewVault",request,error.stack);
            callback(error.toString())
        })
    }

    updateVaultAccout(vaultID, name, callback) {
        this.fireBlockSDK.updateVaultAccount(vaultID, name).then(Accounts => {
            callback(null, Accounts)
        }).catch(error => {
            providerErrorLog("fireblock","updateVaultAccout",{},error.stack);
            callback(error.toString())
        })
    }

    getVaultAssetBalance(vaultID, assetId, callback) {
        this.fireBlockSDK.getVaultAccountAsset(vaultID, assetId).then(AssetBalance => {
            callback(null, AssetBalance)
        }).catch(error => {
            providerErrorLog("fireblock","getVaultAssetBalance",{},error.stack);
            callback(error.toString())
        })
    }

    addAssetIntoVault(vaultID, assetId, callback) {
        this.fireBlockSDK.createVaultAsset(vaultID, assetId).then(assetDetails => {
            callback(null, assetDetails)
        }).catch(error => {
            providerErrorLog("fireblock","addAssetIntoVault",{},error.stack);
            callback(error.toString())
        })
    }

    getDepositeAddress(vaultID, assetId, callback) {
        this.fireBlockSDK.getDepositAddresses(vaultID, assetId).then(address => {
            callback(null, address)
        }).catch(error => {
            providerErrorLog("fireblock","getDepositeAddress",{},error.stack);
            callback(error.toString())
        })
    }

    generateDepositeAddress(vaultID, assetId, callback) {
        this.fireBlockSDK.generateNewAddress(vaultID, assetId).then(depositeAddresses => {
            callback(null, depositeAddresses)
        }).catch(error => {
            providerErrorLog("fireblock","generateDepositeAddress",{},error.stack);
            callback(error.toString())
        })
    }

    setDepositetAddressDescription(vaultAccountId, assetId, address, tag, description, callback) {
        this.fireBlockSDK.setAddressDescription(vaultAccountId, assetId, address, tag, description).then(Addresses => {
            callback(null, Addresses)
        }).catch(error => {
            providerErrorLog("fireblock","setDepositetAddressDescription",{},error.stack);
            callback(error.toString())
        })
    }

    getMaximumSpendingAmount(vaultAccountId, assetId, callback) {
        this.fireBlockSDK.getMaxSpendableAmount(vaultAccountId, assetId).then(spendingAmount => {
            callback(null, spendingAmount)
        }).catch(error => {
            providerErrorLog("fireblock","getMaximumSpendingAmount",{},error.stack);
            callback(error.toString())
        })
    }

    getInternalWalletList(callback) {
        this.fireBlockSDK.getInternalWallets().then(wallet => {
            callback(null, wallet)
        }).catch(error => {
            providerErrorLog("fireblock","getInternalWalletList",{},error.stack);
            callback(error.toString())
        })
    }

    removeInternalWalletByID(walletId, callback) {
        this.fireBlockSDK.deleteInternalWallet(walletId).then(wallet => {
            callback(null, wallet)
        }).catch(error => {
            providerErrorLog("fireblock","removeInternalWalletByID",{},error.stack);
            callback(error.toString())
        })
    }

    createNewInternalWallet(walletId, assetId, address, tag, callback) {
        this.fireBlockSDK.createInternalWalletAsset(walletId, assetId, address, tag).then(wallet => {
            callback(null, wallet)
        }).catch(error => {
            providerErrorLog("fireblock","createNewInternalWallet",{},error.stack);
            callback(error.toString())
        })
    }

    getInternalWalletAssetList(walletId, assetId, callback) {
        this.fireBlockSDK.getInternalWalletAsset(walletId, assetId).then(assetList => {
            callback(null, assetList)
        }).catch(error => {
            providerErrorLog("fireblock","getInternalWalletAssetList",{},error.stack);
            callback(error.toString())
        })
    }

    removeAssestFromInternalWallet(walletId, assetId, callback) {
        this.fireBlockSDK.deleteInternalWalletAsset(walletId, assetId).then(assetList => {
            callback(null, assetList)
        }).catch(error => {
            providerErrorLog("fireblock","removeAssestFromInternalWallet",{},error.stack);
            callback(error.toString())
        })
    }

    getTransactionList(TransactionFilter, callback) {
        this.fireBlockSDK.getTransactions(TransactionFilter).then(transactionList => {
            callback(null, transactionList)
        }).catch(error => {
            providerErrorLog("fireblock","getTransactionList",{},error.stack);
            callback(error.toString())
        })
    }

    getTransactionDetailsById(txId, callback) {
        this.fireBlockSDK.getTransactionById(txId).then(transactionList => {
            callback(null, transactionList)
        }).catch(error => {
            providerErrorLog("fireblock","getTransactionDetailsById",{},error.stack);
            callback(error.toString())
        })
    }

    getTransactionDetailsByExternalID(txId, callback) {
        this.fireBlockSDK.getTransactionByExternalTxId(txId).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            providerErrorLog("fireblock","getTransactionDetailsByExternalID",{},error.stack);
            callback(error.toString())
        })
    }

    cancelTransaction(txId, callback) {
        this.fireBlockSDK.cancelTransactionById(txId).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            providerErrorLog("fireblock","cancelTransaction",{},error.stack);
            callback(error.toString())
        })
    }

    dropTransactionById(txId, feeLevel, callback) {
        this.fireBlockSDK.dropTransaction(txId, feeLevel).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            providerErrorLog("fireblock","dropTransactionById",{},error.stack);
            callback(error.toString())
        })
    }

    freezeTransactionById(txId, callback) {
        this.fireBlockSDK.freezeTransaction(txId).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            providerErrorLog("fireblock","freezeTransactionById",{},error.stack);
            callback(error.toString())
        })
    }

    unfreezeTransactionById(txId, callback) {
        this.fireBlockSDK.unfreezeTransaction(txId).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            providerErrorLog("fireblock","unfreezeTransactionById",{},error.stack);
            callback(error.toString())
        })
    }

    validateDestinationAddress(assetId, address, callback) {
        this.fireBlockSDK.validateAddress(assetId, address).then(transaction => {
            callback(null, transaction)
        }).catch(error => {
            providerErrorLog("fireblock","validateDestinationAddress",{},error.stack);
            callback(error.toString())
        })
    }

    getAssetFees(assetId, callback) {
        this.fireBlockSDK.getFeeForAsset(assetId).then(fees => {
            callback(null, fees)
        }).catch(error => {
            providerErrorLog("fireblock","getAssetFees",{},error.stack);
            callback(error.toString())
        })
    }

    getEstimateFees(TransactionRequest, callback) {
        this.fireBlockSDK.estimateFeeForTransaction(TransactionRequest).then(fees => {
            callback(null, fees)
        }).catch(error => {
            providerErrorLog("fireblock","getEstimateFees",{},error.stack);
            callback(error.toString())
        })
    }

    getSupportedAssetList(callback) {
        this.fireBlockSDK.getSupportedAssets().then(assetLists => {
            callback(null, assetLists)
        }).catch(error => {
            providerErrorLog("fireblock","getSupportedAssetList",{},error.stack);
            callback(error.toString())
        })
    }
}

