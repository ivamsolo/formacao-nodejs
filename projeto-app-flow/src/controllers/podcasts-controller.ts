import { IncomingMessage, ServerResponse, request } from "http";
import { serviceListEpisodes } from "../services/list-episodes-service";
import { serviceFilterEpisodes } from "../services/filter-episodes-service";
import { PodcastTransferModel } from "../models/podcast-transfer-model";

const DEFAULT_CONTENT = {"Content-Type": "application/json"};

export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
    const content: PodcastTransferModel = await serviceListEpisodes();

    res.writeHead(content.statusCode, DEFAULT_CONTENT);
    res.write(JSON.stringify(content.body));

    res.end();
};

export const getFilterEpisodes = async (queryString: string, res: ServerResponse) => {

    const podcastName = queryString?.split("=")[1] || "";
    
    const content: PodcastTransferModel = await serviceFilterEpisodes(podcastName);

    res.writeHead(content.statusCode, DEFAULT_CONTENT);
    res.write(JSON.stringify(content.body));

    res.end();
};