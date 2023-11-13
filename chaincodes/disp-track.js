/*
Author       : Ramaguru Radhakrishnan, Assistant Professor, Amrita Vishwa Vidyapeetham
Created Date : Sept-2023
Updated Date : Oct-2023
Description  : Hyperledger Fabric Chaincode to management Provenance of document
Language     : JavaScript
Version      : 0.1.0
*/

const { Contract } = require('fabric-contract-api');

class ProvenanceChaincode extends Contract {
    async initLedger(ctx) {
        console.info('Initializing ledger');
    }

    // Create a new classified document
    async createDocument(ctx, documentId, title, classificationLevel, content) {
        // Check if the document already exists
        const existingDocBytes = await ctx.stub.getState(documentId);
        if (existingDocBytes && existingDocBytes.length > 0) {
            throw new Error(`Document ${documentId} already exists`);
        }
		
		// Check if the classification level is valid
        if (!['Unclassified', 'Restricted', 'Confidential', 'Secret', 'Top Secret'].includes(classificationLevel)) {
            throw new Error(`Invalid classification level: ${classificationLevel}`);
        }


        const creator = ctx.clientIdentity.getID();
        const document = {
            title,
            classificationLevel, // Unclassified, Restricted, Confidential, Secret, Top Secret
            content,
            owner: creator,
            history: [{
                action: 'Created',
                timestamp: new Date().toISOString(),
                actor: creator,
            }],
            accessLists: {
                read: [creator], // Initial read access for the creator
                modify: [creator], // Initial modify access for the creator
                append: [creator], // Initial append access for the creator
            },
        };

        await ctx.stub.putState(documentId, Buffer.from(JSON.stringify(document)));
    }

    // ... (Transfer ownership, grant access, get document functions)

    // Add access for a user to a specific access level
    async addAccess(ctx, documentId, accessLevel, user) {
        const documentBytes = await ctx.stub.getState(documentId);
        if (!documentBytes || documentBytes.length === 0) {
            throw new Error(`Document ${documentId} not found`);
        }

        const currentOwner = ctx.clientIdentity.getID();
        const document = JSON.parse(documentBytes.toString());

        if (document.owner !== currentOwner) {
            throw new Error(`You are not the owner of document ${documentId}`);
        }

        // Check the valid access levels
        if (!document.accessLists.hasOwnProperty(accessLevel)) {
            throw new Error(`Invalid access level: ${accessLevel}`);
        }

        document.accessLists[accessLevel].push(user);

        await ctx.stub.putState(documentId, Buffer.from(JSON.stringify(document)));
    }

    // Check if a user has access to a specific access level
    hasAccess(document, accessLevel, user) {
        return document.accessLists[accessLevel].includes(user);
    }
	
	// Destroy a document (only owner can destroy)
    async destroyDocument(ctx, documentId) {
        const documentBytes = await ctx.stub.getState(documentId);
        if (!documentBytes || documentBytes.length === 0) {
            throw new Error(`Document ${documentId} not found`);
        }

        const currentOwner = ctx.clientIdentity.getID();
        const document = JSON.parse(documentBytes.toString());

        if (document.owner !== currentOwner) {
            throw new Error(`You are not the owner of document ${documentId}`);
        }

        // Delete the document from the ledger
        await ctx.stub.deleteState(documentId);
    }

    // Revoke access to a specific access level from a user
    async revokeAccess(ctx, documentId, accessLevel, user) {
        const documentBytes = await ctx.stub.getState(documentId);
        if (!documentBytes || documentBytes.length === 0) {
            throw new Error(`Document ${documentId} not found`);
        }

        const currentOwner = ctx.clientIdentity.getID();
        const document = JSON.parse(documentBytes.toString());

        if (document.owner !== currentOwner) {
            throw new Error(`You are not the owner of document ${documentId}`);
        }

        // Check the valid access levels
        if (!document.accessLists.hasOwnProperty(accessLevel)) {
            throw new Error(`Invalid access level: ${accessLevel}`);
        }

        // Remove user from the access list of the specified level
        document.accessLists[accessLevel] = document.accessLists[accessLevel].filter(u => u !== user);

        await ctx.stub.putState(documentId, Buffer.from(JSON.stringify(document)));
    }
}

module.exports = ProvenanceChaincode;
