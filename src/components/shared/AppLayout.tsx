import { Web3Modal } from "../../api/connection";
import Header from "./Header";
import { Toaster } from "sonner";

const AppLayout = ({ children }: any) => {
	return (
		<Web3Modal>
			<div className="w-full max-w-[1728px] m-auto relative overflow-hidden min-h-screen">
				{/* Gradients as Images */}
				<img
					src="/grad1.svg"
					className="absolute -bottom-32 -left-44 w-[40%] opacity-40"
					alt="Gradient 1"
				/>
				<img
					src="/grad1.svg"
					className="absolute top-0 -right-[20rem] w-[35%] opacity-40"
					alt="Gradient 2"
				/>

				<div className="max-w-[1413px] m-auto w-full lg:w-[81.77%] overflow-hidden relative">
					<div className="flex flex-col items-center justify-center w-full">
						<Header />
						{children}
					</div>
				</div>
				<Toaster richColors position="top-right" />
			</div>
		</Web3Modal>
	);
};

export default AppLayout;
