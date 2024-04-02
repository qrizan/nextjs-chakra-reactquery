import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import bookmarkGame from '@/services/bookmarkGame';
import { checkAuthentication } from '@/utils/checkAuthentication';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function useBookmarkGame() {
    const toast = useToast();
    const router = useRouter();
    const token = Cookies.get('token');


    const mutation = useMutation({
        mutationFn: bookmarkGame,
        onSuccess: (data) => {
            toast({
                title: "Success",
                status: "success",
                description: data.message,
                isClosable: true,
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                status: "error",
                description: error.message,
                isClosable: true,
            });
        },
    });

    const bookmark = async (gameId: string) => {
        const isAuthenticated = await checkAuthentication(token);

        if (isAuthenticated) {
            mutation.mutate(gameId);
        } else {
            router.push("/signin");
        }
    };

    return bookmark;
}

export default useBookmarkGame;