#!/usr/bin/env bash
set -euo pipefail

# Tear down the test environment, recreate it, and wait for all services to be ready
echo '(Re)creating test environment'
docker compose down -v screeps mongo redis
docker compose up -d --wait

# Pause the server to prevent server from entering an inconsistent state
echo 'Pausing server'
docker compose exec screeps cli -c 'system.pauseSimulation()'

# Seed terminals and portals
echo 'Seeding room objects'
docker compose exec screeps cli -c 'utils.addNPCTerminals()'
docker compose exec screeps cli -c 'storage.db["rooms.objects"].insert([{ room: "W0N5", type: "portal", x: 25, y: 25, destination: { x: 25, y: 25, room: "W10N5" } }, { room: "W10N5", type: "portal", x: 25, y: 25, destination: { x: 25, y: 25, room: "W0N5" } }])'

# Restart the server to ensure changes are applied.
# Wait a moment for the CLI to become available after the server starts.
echo 'Restarting and resuming server'
docker compose restart --no-deps screeps
sleep 5
docker compose exec screeps cli -c 'system.resumeSimulation()'

echo 'Done'
