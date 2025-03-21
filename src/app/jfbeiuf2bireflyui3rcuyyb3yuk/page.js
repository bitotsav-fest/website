'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data);
        if (data.length === 0) {
          toast.info('No users found');
        }
      } else {
        throw new Error(data.message || 'Failed to search users');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifiedToggle = async (userId, currentStatus) => {
    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          updates: { verified: !currentStatus }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, verified: !currentStatus } : user
        ));
        toast.success('User verification status updated');
      } else {
        throw new Error(data.message || 'Failed to update user');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUserUpdate = async (userId, updates) => {
    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, updates })
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, ...updates } : user
        ));
        toast.success('User information updated');
      } else {
        throw new Error(data.message || 'Failed to update user');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="flex gap-4">
        <Input
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {users.length > 0 && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <Input
                      defaultValue={user.name || ''}
                      onBlur={(e) => {
                        if (e.target.value !== user.name) {
                          handleUserUpdate(user.id, { name: e.target.value });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={user.email || ''}
                      onBlur={(e) => {
                        if (e.target.value !== user.email) {
                          handleUserUpdate(user.id, { email: e.target.value });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      defaultValue={user.rollNumber || ''}
                      onBlur={(e) => {
                        if (e.target.value !== user.rollNumber) {
                          handleUserUpdate(user.id, { rollNumber: e.target.value });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.verified}
                      onCheckedChange={() => handleVerifiedToggle(user.id, user.verified)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (document.activeElement.tagName === 'INPUT') {
                          document.activeElement.blur();
                        }
                      }}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
