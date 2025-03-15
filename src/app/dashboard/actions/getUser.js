'use server'

// get user from prisma

export const getUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      uuid: true,
      username: true,
      name: true,
      rollNumber: true,
      passMail: true,
      emailVerified: true,
      email: true,
      isBITMesraStudent: true,
      role: true,
      verified: true,
      usedOnDay1: true,
      usedOnDay2: true,
      usedOnDay3: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return user;
};