// backend-strapi/config/plugins.ts
export default ({ env }: { env: any }) => ({
    "users-permissions": {
        config: {
            register: {
                allowedFields: ["name", "username", "email", "password"],
            },
        },
    },
});
