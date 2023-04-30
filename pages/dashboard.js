import CollectionPreview from "@/components/CollectionPreview";
import Collections from "@/components/Collections";
import CreateCollectionModal from "@/components/CreateCollectionModal";
import H1 from "@/components/H1";
import Navbar from "@/components/Navbar";
import XMargins from "@/components/XMargins";
import YMargins from "@/components/YMargins";

export default function dashboard() {
    return (
        <main className='bg-base-200 min-h-screen'>
            <CreateCollectionModal />
            <Navbar />
            <XMargins>
                <YMargins>
                    <H1>Your flashcard collections</H1>
                    <a href="#create-collection-modal" className="btn btn-accent my-6">Create Collection</a>
                    <Collections />
                </YMargins>
            </XMargins>
        </main>
    )
}