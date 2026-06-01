package com.abhi.skillloopai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.tags.Tag;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SkillLoop AI API")
                        .version("1.0")
                        .description("SkillLoop AI backend API docs"))
                .addTagsItem(new Tag().name("Auth").description("Authentication APIs"))
                .addTagsItem(new Tag().name("Study").description("Study session APIs"))
                .addTagsItem(new Tag().name("Viva").description("Viva APIs"))
                .addTagsItem(new Tag().name("PDF").description("PDF processing APIs"));
    }
}
