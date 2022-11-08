import {
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import cryptoJs from "crypto-js";
import CONFIG from "./constants";

const client = new CognitoIdentityProviderClient({
  region: CONFIG.cognito.AWS_COGNITO_REGION,
  credentials: {
    accessKeyId: CONFIG.cognito.AWS_COGNITO_ACCESS_ID,
    secretAccessKey: CONFIG.cognito.AWS_COGNITO_SECRET_ACCESS_KEY,
  },
});

const generate_secret_hash = (username) => {
  const secret = CONFIG.cognito.AWS_COGNITO_APP_CLIENT_SECRET;
  const clientId = CONFIG.cognito.AWS_COGNITO_APP_CLIENT_ID;

  const hmac = cryptoJs.algo.HMAC.create(cryptoJs.algo.SHA256, secret);
  hmac.update(username);
  hmac.update(clientId);

  const hash = hmac.finalize();
  const hash64 = cryptoJs.enc.Base64.stringify(hash);
  return hash64;
};
class Cognito {
  client = client;

  async sendCommand(command) {
    return await this.client.send(command);
  }

  async login({ username, password }) {
    const loginCommand = new InitiateAuthCommand({
      ClientId: CONFIG.cognito.AWS_COGNITO_APP_CLIENT_ID,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: generate_secret_hash(username),
      },
    });
    return await this.sendCommand(loginCommand);
  }

  async signup({ username, password }) {
    const signUpCommand = new SignUpCommand({
      ClientId: CONFIG.cognito.AWS_COGNITO_APP_CLIENT_ID,
      SecretHash: generate_secret_hash(username),
      Username: username,
      Password: password,
    });
    return await this.sendCommand(signUpCommand);
  }

  async refreshToken(token) {
    const refreshTokenCommand = new InitiateAuthCommand({
      ClientId: CONFIG.cognito.AWS_COGNITO_APP_CLIENT_ID,
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: token,
      },
    });
    return await this.sendCommand(refreshTokenCommand);
  }

  async logout(accessToken) {
    const signOutCommand = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });
    return await this.sendCommand(signOutCommand);
  }
}

export default new Cognito();
