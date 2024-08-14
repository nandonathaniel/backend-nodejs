import http, { IncomingMessage, ServerResponse } from 'http';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from './user';

const port = 3000;

const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        const users = getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));

    } else if (req.url?.match(/\/api\/users\/\d+/) && req.method === 'GET') {
        const id = parseInt(req.url.split('/').pop()!, 10);
        const user = getUserById(id);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }

    } else if (req.url === '/api/users' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const { name, email, dateOfBirth } = JSON.parse(body);
            const newUser = createUser({ name, email, dateOfBirth });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });

    } else if (req.url?.match(/\/api\/users\/\d+/) && req.method === 'PATCH') {
        const id = parseInt(req.url.split('/').pop()!, 10);
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const updates = JSON.parse(body);
            const existingUser = getUserById(id);
            if (existingUser) {
                const updatedUser = updateUser(id, { 
                    name: updates.name || existingUser.name,
                    email: updates.email || existingUser.email,
                    dateOfBirth: updates.dateOfBirth || existingUser.dateOfBirth
                });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });

    } else if (req.url?.match(/\/api\/users\/\d+/) && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/').pop()!, 10);
        const user = getUserById(id);
        if (user) {
            deleteUser(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Delete successful' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
