
import EmptyState from './components/EmptyState'
import Container from './components/Container'
import LoadingDefault from './components/LoadingDefault'
import Button from './components/Button'
import Link from 'next/link'
export default function Home() {

    return (
        <Container>
            <LoadingDefault />
            <Link href={'/login'} className='p-2 rounded-md shadow-md hover:bg-orange-300'>Login</Link>
            <EmptyState showReset />
        </Container>
    )
}
