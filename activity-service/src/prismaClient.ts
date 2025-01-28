import { Activity, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getActivities(searchQuery?: string) {
    const activities = await prisma.activity.findMany({
      where: searchQuery
      ? {
          title: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        }
      : undefined, 
    });
    return activities;
}

export async function getActivity(activityId?: string) {
  const activity = await prisma.activity.findUnique({
    where: {
      id: Number(activityId),
    },
  })
  return activity;
}

export async function createActivity(newActivity: Activity) {
    try {
        const activity = await prisma.activity.create({
          data: newActivity,
        });
    
        console.log("Activity created successfully:", activity);
      } catch (error) {
        console.error("Error creating activity:", error);
      } finally {
        await prisma.$disconnect();
      }
} 

