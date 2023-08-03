import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body

  if (!name || !email || !password) {
    return new NextResponse('Missing fields', { status: 400 })
  }

  const exist = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (exist) {
    throw new Error('Email Already Exist')
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}