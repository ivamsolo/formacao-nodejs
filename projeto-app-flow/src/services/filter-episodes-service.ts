import { repoPodcast } from "../repositories/podcast-repository";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (podcastName: string): Promise<PodcastTransferModel> => {
    
    const data = await repoPodcast(podcastName);

    const responseFormat: PodcastTransferModel = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT,
        body: data,
    };
    
    return responseFormat;
};