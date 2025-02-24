export function handleError(error: any): { error: string } {
  if (error instanceof Error) {
    return { error: error.message };
  } else {
    return { error: 'Unknown error occurred' };
  }
}