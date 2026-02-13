import { Response } from "../../Domain/models/Response";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";

export class ResponseApiMapper {
  static toDomain(apiResponse: ResponseApiDelivery): Response {
    return {
      success: apiResponse.success,
      message: apiResponse.message,
      data: apiResponse.data,
    };
  }
}
