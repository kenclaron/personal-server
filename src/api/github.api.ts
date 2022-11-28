import { Request, Response } from "express";
import { OctokitResponse } from "@octokit/types";
import fs from "fs";

import { GitHub } from "../services/github.service";

import { ResponseError } from "../types/error.type";
import { Limits, Repositories, Languages } from "../types/github.type";

import Config from "../utils/config.class";
import Information from "../utils/information.class";
import ResponseForm from "../utils/response.class";
import StatusHandler from "../utils/status.class";

const CACHE_DAY = 1;

export class GitHubAPI {
  static async getLimits(request: Request, response: Response) {
    const github = await GitHub.getLimits();

    if (!github) {
      response.status(404).send(ResponseForm.Error.create(404, "Not Found"));
      Information.status(404, request.method, request.url);

      return 404;
    }

    if (github.status !== 200) {
      const error = github as unknown as ResponseError;

      response
        .setHeader("Content-Type", "application/json")
        .status(error.status)
        .send(
          ResponseForm.Error.create(error.status, error.response.data.message)
        );

      Information.status(error.status, request.method, request.url);

      return error.status;
    }

    const limits = (github as OctokitResponse<Limits, number>).data;

    const isLimited = limits.resources.core.used >= limits.resources.core.limit;

    response.sendStatus(isLimited ? 403 : 200);

    Information.status(isLimited ? 403 : 200, request.method, request.url);

    return isLimited ? 403 : 200;
  }

  static async getRepositories(request: Request, response: Response) {
    const username = request.params.username;
    const filename = `/repositories/${username}.json`;
    const cached =
      request.query.cached === "true" &&
      fs.existsSync(Config.github + filename);
    const needCache =
      addDays(fs.statSync(Config.github + filename).mtime, CACHE_DAY) >
      new Date();
    const github =
      StatusHandler.cached || (cached && needCache)
        ? false
        : await GitHub.getRepositories(username);

    if (!github) {
      if (fs.existsSync(Config.github + filename)) {
        response
          .setHeader("Content-Type", "application/json")
          .status(206)
          .send(fs.readFileSync(Config.github + filename));

        Information.status(206, request.method, request.url, "(CACHED)");
      } else {
        response.status(404).send(ResponseForm.Error.create(404, "Not Found"));
        Information.status(404, request.method, request.url);
      }

      return;
    }

    if (
      github.status !== 200 ||
      StatusHandler.cached ||
      (cached && needCache)
    ) {
      if (cached || fs.existsSync(Config.github + filename)) {
        response
          .setHeader("Content-Type", "application/json")
          .status(206)
          .send(fs.readFileSync(Config.github + filename));

        Information.status(206, request.method, request.url, "(CACHED)");
      } else {
        const error = github as unknown as ResponseError;

        response
          .setHeader("Content-Type", "application/json")
          .status(error.status)
          .send(
            ResponseForm.Error.create(error.status, error.response.data.message)
          );

        Information.status(github.status, request.method, request.url);
      }

      return;
    }

    const repositories = (github as OctokitResponse<Repositories, number>).data;
    const data = [];

    for (const repository of repositories) {
      const languages = (
        (await GitHub.getLanguages(
          repository.owner.login,
          repository.name
        )) as OctokitResponse<Languages, number>
      ).data;

      data.push({
        id: repository.id,
        name: repository.name,
        full_name: repository.full_name,
        description: repository.description,
        private: repository.private,
        fork: repository.fork,
        created_at: repository.created_at,
        updated_at: repository.updated_at,
        pushed_at: repository.pushed_at,
        git_url: repository.git_url,
        html_url: repository.html_url,
        homepage: repository.homepage,
        size: repository.size,
        stargazers_count: repository.stargazers_count,
        watchers_count: repository.watchers_count,
        forks_count: repository.forks_count,
        language: repository.language,
        languages: languages,
        archived: repository.archived,
        disabled: repository.disabled,
        open_issues_count: repository.open_issues_count,
        license: repository.license,
        is_template: repository.is_template,
        topics: repository.topics,
        visibility: repository.visibility,
        forks: repository.forks,
        default_branch: repository.default_branch,
        owner: {
          avatar_url: repository.owner.avatar_url,
          id: repository.owner.id,
          login: repository.owner.login,
          email: repository.owner.email,
          name: repository.owner.name,
          url: repository.owner.url,
          type: repository.owner.type,
        },
      });
    }

    !fs.existsSync(Config.github) && fs.mkdirSync(Config.github);
    !fs.existsSync(Config.github + "/repositories") &&
      fs.mkdirSync(Config.github + "/repositories");
    fs.writeFileSync(
      Config.github + `/repositories/${username}.json`,
      JSON.stringify(data),
      "utf8"
    );

    response
      .setHeader("Content-Type", "application/json")
      .status(200)
      .send(data);

    Information.status(200, request.method, request.url);
  }
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default GitHubAPI;
