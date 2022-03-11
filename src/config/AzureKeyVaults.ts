import { EnvironmentCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

class AzureKeyVaults {
    private credential: EnvironmentCredential;
    private clientAzureKeyVault: SecretClient;
    private keyVaultName: string;
    private KeyVaultUri: string;

    constructor() {
        this.credential = new EnvironmentCredential();
        this.keyVaultName = process.env.KEY_VAULT_NAME;
        this.KeyVaultUri = `https://${this.keyVaultName}.vault.azure.net`;
        this.clientAzureKeyVault = new SecretClient(
            this.KeyVaultUri,
            this.credential
        );
        console.log("AzureKeyVault conectado");
    }

    async getSecret(secret: string) {
        try {
            const secretValue = await this.clientAzureKeyVault.getSecret(
                secret
            );
            return secretValue.value;
        } catch (error) {
            console.error(error.message);
            return undefined;
        }
    }
}
const azureKeyVaults = new AzureKeyVaults();
export { azureKeyVaults };
