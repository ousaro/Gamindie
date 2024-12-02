package com.ousaro.gamindie.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
    info = @Info(
        contact = @Contact(
            name = "Ousaro",
            email = "contact@ousaro.com",
            url = "https://ousaro.com"
        ),
        title = "Gamindie API",
        version = "1.0",
        description = "API for Gamindie",
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0.html"
        ),
        termsOfService = "Terms of Service"
    ),
    servers={
        @Server(
            description = "Local server",
            url = "http://localhost:8088/api/v1"
        ),
        @Server(
            description = "Production server",
            url = "https://gamindie.com"
        )
    },
    security={
        @SecurityRequirement(
            name = "bearerAuth"
        )
    }

)
@SecurityScheme(
    name = "bearerAuth",
    description = "JWT auth",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)

public class OpenApiConfig {
    
}
