const { CosmosClient } = require("@azure/cosmos");

// Set Database name and container name with unique timestamp
const databaseName = `cognitive`;
const containerName = `imageContainer`;

// Authenticate to Azure Cosmos DB
const cosmosClient = new CosmosClient("AccountEndpoint=https://cosmos-cognitive.documents.azure.com:443/;AccountKey=3JulYyO7LBT7ULY8YRe4IKlMJWFBmGV7fypf9joH6xyKkPq5SMgoe76zbVK89c9LFGDUPXtWK9sJACDbOscoRQ==;");

async function getDocument(documentId) {
    const database = cosmosClient.database(databaseName);
    const container = database.container(containerName);

    const { resource } = await container.item(documentId).read();
    return resource;
}


async function deleteDocument(fieldValue) {
    const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
    const { container } = await database.containers.createIfNotExists({ id: containerName });

    const querySpec = {
        query: "SELECT * FROM c WHERE c.id=@fieldValue",
        parameters: [
            {
                name: "@fieldValue",
                value: fieldValue
            },
        ],
    };
    console.log(querySpec)

    const { resources } = await container.items.query(querySpec).fetchAll();

    if (resources.length === 0) {
        throw new Error("Document not found");
    }
    console.log(
        { resources }
    )

    const { resource } = await container.item(resources[0].id, resources[0].categories).delete();

    return resource;
}

module.exports = {
    getDocument, deleteDocument
}