'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { Trash2, UserRoundPlus } from "lucide-react"

import { FormEvent, useEffect, useRef, useState } from "react"
import { app } from "../api"
import { config } from 'dotenv'
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface UserProps {
  id: string,
  name: string,
  email: string,
  status: boolean,
  createAt: string
}

export default function TableComponent() {
  config();

  const [users, setUsers] = useState<UserProps[]>([])
  async function loadUsers() {
    try {      
      const response = await app.get(`/users?key=${apiKey}`);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)

    async function handleSubmit(event: FormEvent) {
      event.preventDefault();
      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      console.log(name,email)
      if(!name || !email) return;
      const response = await app.post(`/create-user?key=${apiKey}`, {
          name: name,
          email: email
      })
      if (response.data) {
        setUsers(allUsers => [...allUsers, response.data])
        // Recarregar a lista completa do backend para garantir que os dados estejam corretos
        await loadUsers();
  
        // Limpar os campos de input
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
      }
      return
    }  

    async function handleDelete(id:string) {
      try {
        await app.delete(`/delete-user?key=f7c3e3a2-9d4b-4b9e-b51d-78a1b8c5a067&id=${id}`)
        const allUsers = users.filter((user) => user.id !== id);

        setUsers(allUsers);
        loadUsers();
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="p-6 w-4/5 mx-auto gap-24 flex flex-col">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Crie um novo usuário</CardTitle>
          <CardDescription>Crie um novo usuário com apenas um clique.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Nome do seu novo usuário" ref={nameRef}/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">E-mail</Label>
                <Input id="email" placeholder="E-mail do seu novo usuário" ref={emailRef}/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" onClick={handleSubmit} variant={"default"} className="w-full"><UserRoundPlus/>Enviar</Button>
        </CardFooter>
      </Card>

      <div className="border rounded relative">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID:</TableHead>
              <TableHead>Name:</TableHead>
              <TableHead>E-mail:</TableHead>
              <TableHead>Status:</TableHead>
              <TableHead>Ações:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            { users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{ user.status ? "Ativo" : "Inativo" }</TableCell>
                <TableCell><Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}><Trash2/></Button></TableCell>
            </TableRow>
            )) }

          </TableBody>
        </Table>
      </div>
    </div>
  );
}

