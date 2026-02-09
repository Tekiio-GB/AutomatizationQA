# Conexión Agente VS Code ↔ MCP de NetSuite

## Objetivo

Permitir que el agente de VS Code interactúe de forma segura con NetSuite mediante el MCP (Model Context Protocol).

## Componentes

* **VS Code:** Interfaz donde trabaja el usuario.
* **Agente:** Interpreta solicitudes y las envía al MCP.
* **MCP de NetSuite:** Controla permisos y expone operaciones disponibles.
* **NetSuite:** Sistema donde se ejecutan las acciones.

## Flujo Básico

1. El usuario solicita una acción desde VS Code.
2. El agente envía la solicitud al MCP.
3. El MCP valida permisos.
4. NetSuite procesa y responde.
5. El resultado vuelve al agente y se muestra en VS Code.

## Requisitos

* VS Code con agente configurado
* Acceso al MCP
* Rol de NetSuite con permisos mínimos
* Credenciales o token válido

## Buenas Prácticas

* Usar Sandbox
* Aplicar principio de menor privilegio
* Versionar cambios

## Versión

* v1.1 (Resumen)
