export const getStatusColor = (status: string) => {
switch (status) {
    case "open":
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "pending":
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "closed":
    return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    default:
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
}
};