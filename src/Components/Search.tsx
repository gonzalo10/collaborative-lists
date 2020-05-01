import React, { useState, useEffect, useCallback, MouseEvent } from 'react';
import fetch from 'cross-fetch';
import styled from 'styled-components';
import useDebounce from '../utils/debounce-hook';

interface InnputWrapperInterface {
	isOpen: boolean;
}
interface OptionState {
	name: string;
	id: string;
	year: string;
	img: string;
	actors: string;
}

interface OutputItem {
	isSelected: boolean;
}
interface autoCompleteMovie {
	l: string;
	i: { imageUrl: string };
	id: string;
	yr: string;
	s: string;
	url: string;
}

interface SearchProps {
	setSelectedOption: (props: OptionState) => void;
}

const Icon = styled.div`
	margin: auto;
	padding-right: 20px;
`;

const InputWrapper = styled.div<InnputWrapperInterface>`
	background: #fff;
	display: flex;
	border: 1px solid #dfe1e5;
	border-radius: 24px;
	height: 44px;
	margin: 0 auto;
	width: 482px;
	${(props) =>
		props.isOpen &&
		'border-bottom-left-radius: 0; border-bottom-right-radius: 0;'}
	border-color: rgba(223, 225, 229, 0);
	box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

const Input = styled.input`
	background-color: transparent;
	border: none;
	margin: 0;
	padding: 0;
	color: rgba(0, 0, 0, 0.87);
	word-wrap: break-word;
	outline: none;
	display: flex;
	flex: 100%;
	height: 34px;
	font-size: 16px;
	margin-left: 20px;
	margin-top: 5px;
`;
const SearchWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	width: 482px;
	margin: auto;
`;
const SearchOutput = styled.div`
	width: 100%;
	position: absolute;
	top: 45px;
	background: white;
	background: #fff;
	display: flex;
	flex-direction: column;
	list-style-type: none;
	margin: 0;
	padding: 0;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
	border: 0;
	border-radius: 0 0 24px 24px;
	box-shadow: 0 4px 6px 0 rgba(32, 33, 36, 0.28);
	overflow: hidden;
`;
const OutputList = styled.li`
	flex: auto;
	padding-bottom: 8px;
	max-height: 200px;
	overflow: scroll;
`;
const OuputItem = styled.button<OutputItem>`
	display: flex;
	background: white;
	padding: 10px 20px 10px;
	margin: 0;
	cursor: pointer;
	border: none;
	&:hover {
		background-color: ${(props) => props.theme.yellowLight};
	}
`;
const Separator = styled.div`
	border-top: 1px solid #e8eaed;
	margin: 0px 20px;
`;
const EnfasisText = styled.span`
	color: ${(props) => props.theme.yellow};
	font-weight: 900;
	text-transform: uppercase;
`;
const ImageFallback = styled.div`
	border: 1px solid black;
	width: 50px;
	height: 75px;
`;
const OutputItemText = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	padding: 10px;
`;

export const SearchInput: React.FC<SearchProps> = ({ setSelectedOption }) => {
	const [isOpen, setOpen] = useState(true);
	const [selectedItem, setSelectedItem] = useState(0);
	const [reamaingSearches, setReaminingSearchs] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [isAnalyzingRepo, setIsAnalyzingRepo] = useState(false);
	const [options, setOptions] = useState<OptionState[] | null>(null);
	const [value, debounceValue, setDebounceValue] = useDebounce('', 300);

	const handleKeyDown = useCallback(
		(e) => {
			const { keyCode } = e;
			if (keyCode == 27) return setOpen(false);
			let newIndex = selectedItem;
			if (keyCode === 40) newIndex += 1;
			if (keyCode === 38) newIndex -= 1;
			if (newIndex > (options || []).length || newIndex < -1) return null;
			const indexElem = document.getElementById(`searchItem-${newIndex}`);
			indexElem && indexElem.scrollIntoView();
			setSelectedItem(newIndex);
		},
		[selectedItem, setSelectedItem, options]
	);

	const handleMouseDown = useCallback(() => {
		console.log('mouseDown');
		options?.length && setOpen(true);
	}, [options, setOpen, isOpen]);

	useEffect(() => {
		if (!debounceValue.length) return undefined;
		setIsSearching(true);
		(async () => {
			const response = await fetch(
				`/api/searchMovie?searchTerm=${debounceValue}`
			);
			const parsedResponse = await response.json();
			const autoCompleteMovies: autoCompleteMovie[] = parsedResponse.results;
			if (autoCompleteMovies) {
				setOpen(true);
				setOptions(
					autoCompleteMovies.map((movie) => ({
						name: movie.l,
						id: movie.id,
						year: movie.yr,
						img: movie.i?.imageUrl,
						actors: movie.s
					}))
				);
				setIsSearching(false);
			}
		})();
	}, [debounceValue]);

	useEffect(() => {
		setIsAnalyzingRepo(false);
	}, []);

	const handleInputBlur = () => {
		setOpen(false);
	};
	const handleInputFocus = () => {
		setOpen(true);
	};

	const handleSelectResult = (item: OptionState, index: number) => {
		console.log('handleSelectResult');
		console.log({ item });
		setSelectedOption(item);
		const selectedOption = options && options[index];
		setIsAnalyzingRepo(true);
	};
	return (
		<SearchWrapper>
			<InputWrapper isOpen={isOpen}>
				<Input
					onChange={(e) => setDebounceValue(e.target.value)}
					placeholder='Search github repo'
				/>
				<Icon />
			</InputWrapper>
			<SearchOutput>
				{options && options.length > 0 && isOpen ? (
					<OutputList>
						<Separator />
						{options.map((option, index) => (
							<OuputItem
								onClick={() => handleSelectResult(option, index)}
								key={option?.id}
								id={`searchItem-${index}`}
								isSelected={selectedItem === index}>
								<div>
									{option.img ? (
										<img
											src={option.img}
											srcSet={`${option.img}.split('.')[0]._V1_UY74_CR0,0,50,74_.jpg 50w`}
											sizes='50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw'
											width='50'
										/>
									) : (
										<ImageFallback>No image</ImageFallback>
									)}
								</div>
								<OutputItemText>
									<span>{option.name}</span>
									<span>{option.year}</span>
									<span>{option.actors}</span>
								</OutputItemText>
							</OuputItem>
						))}
					</OutputList>
				) : null}
			</SearchOutput>
		</SearchWrapper>
	);
};

export default SearchInput;
