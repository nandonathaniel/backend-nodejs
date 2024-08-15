import http, { IncomingMessage, ServerResponse } from 'http';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from './user';

const port = 3000;

const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateDateOfBirth = (dateOfBirth: string): boolean => {
    return !isNaN(Date.parse(dateOfBirth));
};

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

            // Validate input
            if (!name || !email || !dateOfBirth) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Name, email, and dateOfBirth are required' }));
                return;
            }

            if (!validateEmail(email)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid email format' }));
                return;
            }

            if (!validateDateOfBirth(dateOfBirth)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid date of birth format' }));
                return;
            }

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
                // Validate input
                if (updates.email && !validateEmail(updates.email)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid email format' }));
                    return;
                }

                if (updates.dateOfBirth && !validateDateOfBirth(updates.dateOfBirth)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid date of birth format' }));
                    return;
                }

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
