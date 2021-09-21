const {FireblocksSDK} = require("fireblocks-sdk");

module.exports = class FireBlockAPI {
    constructor(apiSecret, apiKey) {
        this.fireBlockSDK = new FireblocksSDK(apiSecret, apiKey);
    }

    getVaults (callback){
        this.fireBlockSDK.getVaultAccounts().then(vaults => {
            callback(null,vaults)
        }).catch(error => {
            callback(error.toString());
        });
    }

    getVaultById(vaultID,callback){
        this.fireBlockSDK.getVaultAccount(vaultID).then(vaults => {
            callback(null,vaults)
        }).catch(error => {
            callback(error.toString())
        })
    }

    createNewVault(name, hiddenOnUI, customerRefId, autoFueling,callback){
        this.fireBlockSDK.createVaultAccount(name, hiddenOnUI, customerRefId, autoFueling).then(Vault => {
            callback(null,Vault)
        }).catch(error => {
            callback(error.toString())
        })
    }

    updateVaultAccout(vaultID,name,callback){
        this.fireBlockSDK.updateVaultAccount(vaultID,name).then(Accounts => {
            callback(null,Accounts)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getVaultAssetBalance(vaultID, assetId,callback){
        this.fireBlockSDK.getVaultAccountAsset(vaultID, assetId).then(AssetBalance => {
            callback(null,AssetBalance)
        }).catch(error => {
            callback(error.toString())
        })
    }

    addAssetIntoVault(vaultID, assetId,callback){
        this.fireBlockSDK.createVaultAsset(vaultID, assetId).then(assetDetails => {
            callback(null,assetDetails)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getDepositeAddress(vaultID, assetId,callback){
        this.fireBlockSDK.getDepositAddresses(vaultID, assetId).then(address => {
            callback(null,address)
        }).catch(error => {
            callback(error.toString())
        })
    }

    generateDepositeAddress(vaultID, assetId,callback){
        this.fireBlockSDK.generateNewAddress(vaultID, assetId).then(depositeAddresses => {
            callback(null,depositeAddresses)
        }).catch(error => {
            callback(error.toString())
        })
    }

    setDepositetAddressDescription(vaultAccountId, assetId, address, tag, description,callback){
        this.fireBlockSDK.setAddressDescription(vaultAccountId, assetId, address, tag, description).then(Addresses => {
            callback(null,Addresses)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getMaximumSpendingAmount(vaultAccountId, assetId,callback){
        this.fireBlockSDK.getMaxSpendableAmount(vaultAccountId, assetId).then(spendingAmount => {
            callback(null,spendingAmount)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getInternalWalletList(callback){
        this.fireBlockSDK.getInternalWallets().then(wallet  => {
            callback(null,wallet)
        }).catch(error => {
            callback(error.toString())
        })
    }

    removeInternalWalletByID(walletId,callback){
        this.fireBlockSDK.deleteInternalWallet(walletId).then(wallet  => {
            callback(null,wallet)
        }).catch(error => {
            callback(error.toString())
        })
    }

    createNewInternalWallet(walletId, assetId, address, tag,callback){
        this.fireBlockSDK.createInternalWalletAsset(walletId, assetId, address, tag).then(wallet  => {
            callback(null,wallet)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getInternalWalletAssetList (walletId, assetId,callback){
        this.fireBlockSDK.getInternalWalletAsset(walletId, assetId).then(assetList  => {
            callback(null,assetList)
        }).catch(error => {
            callback(error.toString())
        })
    }

    removeAssestFromInternalWallet (walletId, assetId,callback){
        this.fireBlockSDK.deleteInternalWalletAsset(walletId, assetId).then(assetList  => {
            callback(null,assetList)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getTransactionList(TransactionFilter,callback){
        this.fireBlockSDK.getTransactions(TransactionFilter).then(transactionList => {
            callback(null,transactionList)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getTransactionDetailsById(txId,callback){
        this.fireBlockSDK.getTransactionById(txId).then(transactionList => {
            callback(null,transactionList)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getTransactionDetailsByExternalID(txId,callback){
        this.fireBlockSDK.getTransactionByExternalTxId(txId).then(transaction => {
            callback(null,transaction)
        }).catch(error => {
            callback(error.toString())
        })
    }

    cancelTransaction(txId,callback){
        this.fireBlockSDK.cancelTransactionById(txId).then(transaction => {
            callback(null,transaction)
        }).catch(error => {
            callback(error.toString())
        })
    }

    dropTransactionById(txId,feeLevel,callback){
        this.fireBlockSDK.dropTransaction(txId,feeLevel).then(transaction => {
            callback(null,transaction)
        }).catch(error => {
            callback(error.toString())
        })
    }

    freezeTransactionById(txId,callback){
        this.fireBlockSDK.freezeTransaction(txId).then(transaction => {
            callback(null,transaction)
        }).catch(error => {
            callback(error.toString())
        })
    }

    unfreezeTransactionById(txId,callback){
        this.fireBlockSDK.unfreezeTransaction(txId).then(transaction => {
            callback(null,transaction)
        }).catch(error => {
            callback(error.toString())
        })
    }

    validateDestinationAddress(assetId, address,callback){
        this.fireBlockSDK.validateAddress(assetId, address).then(transaction => {
            callback(null,transaction)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getAssetFees(assetId,callback){
        this.fireBlockSDK.getFeeForAsset(assetId).then(fees => {
            callback(null,fees)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getEstimateFees(TransactionRequest,callback){
        this.fireBlockSDK.estimateFeeForTransaction(TransactionRequest).then(fees => {
            callback(null,fees)
        }).catch(error => {
            callback(error.toString())
        })
    }

    getSupportedAssetList(callback){
        this.fireBlockSDK.getSupportedAssets().then(assetLists => {
            callback(null,assetLists)
        }).catch(error => {
            callback(error.toString())
        })
    }
}

