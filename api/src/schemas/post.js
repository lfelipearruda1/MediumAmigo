import Joi from "joi";

export const postSchema = Joi.object({
  post_desc: Joi.string().min(1).max(500).allow(""),
  img: Joi.string().uri().allow(""),
  userId: Joi.string().uuid().required(),
});
