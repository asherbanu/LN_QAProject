const envName = process.env.TEST_ENV || 'qa';

console.log(`Running tests in ${envName.toUpperCase()} environment`);

let env;

try {
    const envModule = await import(`./${envName}.env.js`);
    env = envModule.default;
} catch (error) {
    throw new Error(
        `Failed to load environment file for '${envName}': ${error.message}`
    );
}

export default env;