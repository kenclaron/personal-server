import { RequestError } from "@octokit/types";

import { Octokit } from "octokit";
import {
  Languages,
  Limits,
  Repositories,
  ResponseWithError,
  User,
} from "../types/github.type";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export class GitHub {
  /**
   * Get current limits
   * @return {Promise<ResponseWithError<Repositories>>}
   */
  static async getLimits(): Promise<ResponseWithError<Limits>> {
    try {
      return octokit
        .request(`GET /rate_limit`)
        .then((response) => response)
        .catch(() => undefined);
    } catch (error) {
      return error as RequestError;
    }
  }

  /**
   * Get repositories by username
   * @param {string} username
   * @return {Promise<ResponseWithError<Repositories>>}
   */
  static async getRepositories(
    username: string
  ): Promise<ResponseWithError<Repositories>> {
    try {
      return octokit
        .request(`GET /users/${username}/repos`, {
          type: "public",
          sort: "created",
        })
        .then((response) => response)
        .catch(() => undefined);
    } catch (error) {
      return error as RequestError;
    }
  }

  /**
   * Get data of user by username
   * @param {string} username
   * @return {Promise<ResponseWithError<User>>}
   */
  static async getUser(username: string): Promise<ResponseWithError<User>> {
    try {
      return octokit
        .request(`GET /users/${username}`)
        .then((response) => response)
        .catch(() => undefined);
    } catch (error) {
      return error as RequestError;
    }
  }

  /**
   * Get repository's languages by username and name
   *
   * @param {string} fullname
   * @return {Promise<OctokitResponse<Languages, number> | RequestError>}
   */
  static async getLanguages(
    fullname: string
  ): Promise<ResponseWithError<Languages>>;
  /**
   * Get repository's languages by username and name
   *
   * @param {string} username
   * @param {string} repository
   * @return {Promise<OctokitResponse<Languages, number> | RequestError>}
   */
  static async getLanguages(
    username: string,
    repository: string
  ): Promise<ResponseWithError<Languages>>;
  static async getLanguages(
    name: string,
    repository?: string
  ): Promise<ResponseWithError<Languages>> {
    try {
      let fullname = repository ? `${name}/${repository}` : name;

      return octokit
        .request(`GET /repos/${fullname}/languages`)
        .then((response) => response)
        .catch(() => undefined);
    } catch (error) {
      return error as RequestError;
    }
  }
}
