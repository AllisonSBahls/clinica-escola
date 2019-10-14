module.exports = {

    secretaryName: async function (req) {
        return await Secretary.findOne({
            where: { userSecretaryId: req.user.id }
        });
    },
}