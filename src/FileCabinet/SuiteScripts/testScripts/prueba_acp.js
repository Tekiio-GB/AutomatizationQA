/*
 * prueba_acp.js
 * @NApiVersion 2.1
 * @NModuleScope Public
 * @NScriptType CustomTool
 */
define(['N/record', 'N/log', 'N/error'], function (record, log, error) {
    return {
        createItem: async function (params) {
            try {
                if (!params || !params.itemId || !params.itemName || !params.itemType) {
                    return { error: 'Missing required parameters: itemId, itemName, itemType' };
                }

                // Create item record
                const newItem = record.create({
                    type: record.Type.INVENTORY_ITEM,
                    isDynamic: false,
                });

                newItem.setValue({ fieldId: 'itemid', value: params.itemId });
                newItem.setValue({ fieldId: 'name', value: params.itemName });

                // Optional fields
                if (params.description) newItem.setValue({ fieldId: 'description', value: params.description });
                if (params.displayName) newItem.setValue({ fieldId: 'displayname', value: params.displayName });
                if (params.cost !== undefined && params.cost !== null) newItem.setValue({ fieldId: 'cost', value: parseFloat(params.cost) });
                if (params.salePrice !== undefined && params.salePrice !== null) newItem.setValue({ fieldId: 'saleprice', value: parseFloat(params.salePrice) });
                if (params.assetAccount) newItem.setValue({ fieldId: 'assetaccount', value: params.assetAccount });
                if (params.incomeAccount) newItem.setValue({ fieldId: 'incomeaccount', value: params.incomeAccount });
                if (params.expenseAccount) newItem.setValue({ fieldId: 'expenseaccount', value: params.expenseAccount });

                const createdId = newItem.save({ enableSourcing: true, ignoreMandatoryFields: false });

                log.audit({ title: 'createItem', details: 'Item created with id ' + createdId });

                return JSON.stringify({ success: true, itemId: createdId, message: 'Artículo creado exitosamente' });
            } catch (e) {
                log.error({ title: 'createItem - error', details: e });
                return { error: e.message || e.toString(), code: e.name };
            }
        },

        getItem: async function (params) {
            try {
                const itemId = params && params.itemId;
                if (!itemId) return { error: 'Missing itemId parameter' };

                const itemRec = record.load({ type: record.Type.INVENTORY_ITEM, id: itemId });

                const result = {
                    id: itemRec.id,
                    name: itemRec.getValue('name'),
                    itemId: itemRec.getValue('itemid'),
                    description: itemRec.getValue('description'),
                    cost: itemRec.getValue('cost'),
                    salePrice: itemRec.getValue('saleprice'),
                };

                log.audit({ title: 'getItem', details: 'Loaded item ' + itemId });
                return JSON.stringify({ success: true, item: result, message: 'Artículo obtenido exitosamente' });
            } catch (e) {
                log.error({ title: 'getItem - error', details: e });
                return { error: e.message || e.toString(), code: e.name };
            }
        },
    };
});
