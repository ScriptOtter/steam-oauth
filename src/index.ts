export class SteamOAuth {
  private strSanitize(str: any): string {
    if (typeof str === "string") {
      return str;
    }
    return "";
  }

  public generateOpenIDAuthURL(baseURL: string, returnURL: string): string {
    const params = {
      "openid.ns": "http://specs.openid.net/auth/2.0",
      "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
      "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
      "openid.mode": "checkid_setup",
      "openid.realm": baseURL,
      "openid.return_to": new URL(returnURL, baseURL).href,
    };

    const redir_url = new URL("https://steamcommunity.com/openid/login");
    redir_url.search = new URLSearchParams(params).toString();
    return redir_url.toString();
  }

  public async verify(
    params: Record<string, string>,
  ): Promise<string | boolean> {
    const sanitized_params = {
      "openid.ns": this.strSanitize(params["openid.ns"]),
      "openid.mode": "check_authentication",
      "openid.op_endpoint": this.strSanitize(params["openid.op_endpoint"]),
      "openid.claimed_id": this.strSanitize(params["openid.claimed_id"]),
      "openid.identity": this.strSanitize(params["openid.identity"]),
      "openid.return_to": this.strSanitize(params["openid.return_to"]),
      "openid.response_nonce": this.strSanitize(
        params["openid.response_nonce"],
      ),
      "openid.assoc_handle": this.strSanitize(params["openid.assoc_handle"]),
      "openid.signed": this.strSanitize(params["openid.signed"]),
      "openid.sig": this.strSanitize(params["openid.sig"]),
    };

    try {
      const response = await fetch("https://steamcommunity.com/openid/login", {
        method: "POST",
        body: new URLSearchParams(sanitized_params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await response.text();

      let fields = data.split("\n");

      let valid = fields.some((val) => {
        let components = val.split(":");
        return components[0] === "is_valid" && components[1] === "true";
      });

      if (valid) {
        let claim = sanitized_params["openid.claimed_id"];
        return claim.slice(claim.lastIndexOf("/") + 1);
      }

      return false;
    } catch (e: unknown) {
      return false;
    }
  }
}
