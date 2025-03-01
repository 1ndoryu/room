export default (plugin: any) => {
    // Guarda la función register original
    const originalRegister = plugin.controllers.auth.register;

    plugin.controllers.auth.register = async (ctx: any) => {
        // Extraemos el campo "name" y dejamos el resto en el body para evitar la validación
        const { name, ...rest } = ctx.request.body;
        ctx.request.body = rest;

        // Ejecutamos el registro por defecto
        await originalRegister(ctx);

        // Si el registro fue exitoso, actualizamos el usuario con el campo "name"
        if (
            ctx.response.status === 200 &&
            ctx.response.body &&
            ctx.response.body.user
        ) {
            const user = ctx.response.body.user;
            const updatedUser = await strapi.entityService.update(
                "plugin::users-permissions.user",
                user.id,
                {
                    data: { name },
                },
            );
            // Actualizamos la respuesta para incluir el nuevo campo
            ctx.response.body.user = updatedUser;
        }
    };


};
