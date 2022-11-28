const ogs = require("open-graph-scraper");

export class OpenGraph {
  /**
   * Get all OpenGraph data
   * @param {string} url
   */
  static async get(url: string): Promise<any> {
    return new Promise<string>((resolve, reject) =>
      ogs({ url: url })
        .then((data) => {
          const { error, result } = data;

          if (error || !result) reject(false);

          resolve(result);
        })
        .catch(() => reject(false))
    );
  }

  static Image = class {
    /**
     * Get OpenGraph image url
     * @param {string} url
     */
    static async get(url: string) {
      return new Promise<string>((resolve, reject) =>
        ogs({ url: url })
          .then((data) => {
            const { error, result } = data;

            if (error || !result.ogImage) reject(false);

            resolve(result.ogImage.url);
          })
          .catch(() => reject(false))
      );
    }
  };
}
