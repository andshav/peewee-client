import { Paper } from '@mui/material';
import type { Identifier, XYCoord } from 'dnd-core';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineClose } from 'react-icons/ai';

export interface ItemProps {
	id: string;
	src: string;
	index: number;
	moveItem: (dragIndex: number, hoverIndex: number) => void;
	onRemove: () => void;
}

interface DragItem {
	index: number
	id: string
	type: string
}

export const Item: FC<ItemProps> = ({ id, src, index, moveItem, onRemove }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: 'card',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			// console.log({ item, dragIndex, hoverIndex });
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			const hoverMiddleX =
				(hoverBoundingRect.right - hoverBoundingRect.left) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
				return;
			}

			// Time to actually perform the action
			moveItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'card',
		item: () => ({ id, index }),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<Paper
			ref={ref}
			className="relative h-24 md:h-32"
			elevation={isDragging ? 8 : 4}
			data-handler-id={handlerId}
			style={{ opacity: isDragging ? 0 : 1 }}
		>
			<img
				className="h-full"
				src={src}
				alt=""
				onError={onRemove}
			/>
			<div
				onClick={onRemove}
				className="absolute top-1 right-1 cursor-pointer"
			>
				<AiOutlineClose />
			</div>
		</Paper>
	);
};
