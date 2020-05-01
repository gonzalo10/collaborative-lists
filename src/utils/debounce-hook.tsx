import {
	useState,
	useEffect,
	useMemo,
	useRef,
	SetStateAction,
	Dispatch
} from 'react';
import debounce from 'lodash.debounce';

export default function useDebounce<T>(
	initialValue: T,
	delay: number
): [T, T, Dispatch<SetStateAction<T>>] {
	const [value, setDebounceValue] = useState(initialValue);
	const [debouncedValue, setDebouncedValueRaw] = useState(initialValue);
	const firstUpdate = useRef(true);

	const setDebouncedValue = useMemo(() => {
		return debounce(setDebouncedValueRaw, delay, {
			leading: false,
			trailing: true
		});
	}, [delay]);

	useEffect(() => {
		if (!firstUpdate.current) {
			setDebouncedValue(value);
		} else {
			firstUpdate.current = false;
		}
	}, [setDebouncedValue, value]);

	return [value, debouncedValue, setDebounceValue];
}
