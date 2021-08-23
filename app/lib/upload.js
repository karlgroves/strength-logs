/**
 * uploads file to s3 aws
 */

const s3 = require('s3');

const client = s3.createClient({
    maxAsyncS3: 20,
    s3RetryCount: 3,
    s3RetryDelay: 1000,
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

module.exports = {
    upload: function (name) {
        return new Promise((resolve, reject) => {
            const params = {
                localFile: name,
                s3Params: {
                    Bucket: 'tenon',
                    Key: `automata/${name}`
                }
            };

            let uploader = client.uploadFile(params);

            uploader.on('error', function (err) {
                log.error('unable to upload:', err.stack);
                reject(err);
            });

            uploader.on('end', function (data) {
                const url = s3.getPublicUrl(params.s3Params.Bucket, params.s3Params.Key);
                log.info(url);
                resolve(url);
            });
        });
    }
};
