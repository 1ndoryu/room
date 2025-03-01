// backend-strapi/config/plugins.ts
export default ({ env }) => ({
    "users-permissions": {
        config: {
            register: {
                allowedFields: ["name", "username", "email", "password"],
            },
        },
    },
});
