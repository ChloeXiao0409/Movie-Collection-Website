const NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
    path: `.env.${NODE_ENV}`,
});


const optionalConfigs = {
    PORT: process.env.PORT || 3000,
    NODE_ENV
};

const requiredConfigs = {
    REQUIRED: process.env.REQUIRED,
};

for (const key in requiredConfigs) {
    if (requiredConfigs[key] == null) {
        throw new Error(`Missing value for env var ${key}`);
    }
}

module.exports = {
    ...optionalConfigs,
    ...requiredConfigs,
};
